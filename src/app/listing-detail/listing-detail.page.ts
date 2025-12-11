import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    FormsModule
  ]
})
export class ListingDetailPage implements OnInit {
  listing: Listing | null = null;
  isLoading: boolean = true;
  error: string | null = null;

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
        }
      })
      .catch(error => {
        console.error('Failed to load listing:', error);
        this.error = 'Failed to load listing: ' + error.message;
        this.isLoading = false;
      });
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
