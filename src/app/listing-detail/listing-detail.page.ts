import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
  IonButton,
  IonBackButton,
  IonButtons,
  IonSpinner
} from '@ionic/angular/standalone';
import { ListingService, Listing } from '../services/listing/listing.service';
import { BookingService } from '../services/booking/booking.service';
import firebase from 'firebase/compat/app';

/**
 * ListingDetailPage - Displays a single property listing from Firestore
 * 
 * Route: /tabs/listing/:id
 * 
 * DEBUGGING:
 * - Check console for 'Fetching listing:' and 'Found listing:' logs
 * - Access services via console: listingService.getListing('id')
 */
@Component({
  selector: 'app-listing-detail',
  templateUrl: './listing-detail.page.html',
  styleUrls: ['./listing-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonImg,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonButton,
    IonBackButton,
    IonButtons,
    IonSpinner,
    CommonModule,
    FormsModule,
    GoogleMapsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListingDetailPage implements OnInit {
  listing: Listing | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  // Map properties
  zoom = 15;
  lat = 53.3498; // Default: Dublin
  lng = -6.2603;
  marker: Marker | null = null;
  mapLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService,
    private bookingService: BookingService
  ) {
    console.log('ListingDetailPage loaded');
  }

  ngOnInit() {
    const listingId = this.route.snapshot.paramMap.get('id');
    console.log('Route param id:', listingId);
    
    if (listingId) {
      this.loadListing(listingId);
    } else {
      this.error = 'No listing ID provided';
      this.isLoading = false;
      console.error('No listing ID in route params');
    }
  }

  /**
   * Load listing data from Firestore
   */
  loadListing(listingId: string) {
    this.isLoading = true;
    this.error = null;

    this.listingService.getListing(listingId)
      .then(listing => {
        this.listing = listing;
        this.isLoading = false;
        
        if (!listing) {
          this.error = 'Listing not found';
        } else if (listing.address) {
          this.geocodeAddress(listing.address);
        }
      })
      .catch(error => {
        console.error('Failed to load listing:', error);
        this.error = 'Failed to load listing: ' + error.message;
        this.isLoading = false;
      });
  }

  /**
   * Convert address to coordinates using Google Geocoding API
   */
  geocodeAddress(address: string) {
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        this.lat = location.lat();
        this.lng = location.lng();
        this.marker = {
          lat: this.lat,
          lng: this.lng,
          label: 'A',
          draggable: false
        };
        this.mapLoaded = true;
        console.log('Geocoded address:', address, { lat: this.lat, lng: this.lng });
      } else {
        console.error('Geocode failed:', status);
        // Show map at default location anyway
        this.mapLoaded = true;
      }
    });
  }

  clickedMarker(label: string | undefined) {
    console.log('Clicked marker:', label);
    if (this.listing) {
      alert('Property: ' + this.listing.title + '\n' + this.listing.address);
    }
  }

  /**
   * Book the current property
   */
  bookNow() {
    if (!this.listing) {
      console.warn('Cannot book - no listing loaded');
      return;
    }

    const user = firebase.auth().currentUser;

    if (!user || !user.email) {
      alert('Please log in to book a property');
      console.warn('Cannot book - user not logged in');
      return;
    }

    console.log('Booking property:', this.listing.title, 'for user:', user.email);

    this.bookingService.bookProperty(user.email, this.listing.title)
      .then((docRef) => {
        console.log('Booking created! ID:', docRef.id);
        alert('Booking confirmed for ' + this.listing?.title);
      })
      .catch((error) => {
        console.error('Booking failed:', error);
        alert('Booking failed: ' + error.message);
      });
  }
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
