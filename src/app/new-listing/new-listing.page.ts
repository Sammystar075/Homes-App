import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';
import { ListingService } from '../services/listing/listing.service';

/**
 * NewListingPage - Form for creating new property listings
 * 
 * Route: /tabs/new-listing
 * 
 * DEBUGGING:
 * - Check console for 'Creating listing:' logs
 * - Access listingService via console: listingService.getAllListings()
 */
@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.page.html',
  styleUrls: ['./new-listing.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonBackButton,
    IonButtons,
    CommonModule,
    FormsModule
  ]
})
export class NewListingPage {
  // Form fields
  title: string = '';
  address: string = '';
  county: string = '';
  bedrooms: number = 1;
  price: number = 0;
  description: string = '';
  imageUrl: string = '';

  constructor(
    private listingService: ListingService,
    private router: Router
  ) {
    console.log('NewListingPage loaded');
  }

  /**
   * Validate and submit the new listing form
   */
  submitListing() {
    // Validation
    if (!this.title || !this.address || !this.county || !this.price) {
      alert('Please fill in all required fields (Title, Address, County, Price)');
      console.warn('Validation failed - missing required fields');
      return;
    }

    const listing = {
      title: this.title,
      address: this.address,
      county: this.county,
      bedrooms: this.bedrooms || 1,
      price: this.price,
      description: this.description || '',
      imageUrl: this.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image',
      createdBy: '' // Will be set by service
    };

    console.log('Submitting listing:', listing);

    this.listingService.addListing(listing)
      .then((docRef) => {
        console.log('Listing created successfully! ID:', docRef.id);
        alert('Listing created successfully!');
        this.router.navigate(['/tabs/tab1']);
      })
      .catch((error) => {
        console.error('Failed to create listing:', error);
        alert('Failed to create listing: ' + error);
      });
  }

  /**
   * Clear form fields
   */
  resetForm() {
    this.title = '';
    this.address = '';
    this.county = '';
    this.bedrooms = 1;
    this.price = 0;
    this.description = '';
    this.imageUrl = '';
    console.log('Form reset');
  }
}
