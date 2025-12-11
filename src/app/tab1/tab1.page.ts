import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSpinner
} from '@ionic/angular/standalone';
import { ListingService, Listing } from '../services/listing/listing.service';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

/**
 * Tab1Page - Main listings page
 * 
 * Displays:
 * 1. Dynamic listings from Firestore (loaded on view enter)
 * 2. Static listings (existing hardcoded cards)
 * 3. FAB button to create new listings
 * 
 * DEBUGGING:
 * - Check console for 'Loaded X listings from Firestore'
 * - Access service via console: listingService.getAllListings()
 * - Seed static data: listingService.seedStaticListings()
 */
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonButton,
    IonFab,
    IonFabButton,
    IonIcon,
    IonSpinner,
    CommonModule,
    RouterModule
  ],
})
export class Tab1Page implements OnInit {
  // Dynamic listings from Firestore
  listings: Listing[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private listingService: ListingService) {
    addIcons({ add });
    console.log('Tab1Page loaded');
  }

  ngOnInit() {
    this.loadListings();
  }

  /**
   * Reload listings when returning to this tab
   */
  ionViewWillEnter() {
    this.loadListings();
  }

  /**
   * Load all listings from Firestore
   */
  loadListings() {
    this.isLoading = true;
    this.error = null;

    this.listingService.getAllListings()
      .then(listings => {
        this.listings = listings;
        this.isLoading = false;
        console.log('Loaded', listings.length, 'listings from Firestore');
      })
      .catch(error => {
        console.error('Failed to load listings:', error);
        this.error = 'Failed to load listings';
        this.isLoading = false;
      });
  }
}
