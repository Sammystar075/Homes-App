import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

/**
 * Listing interface - defines the structure of a property listing
 */
export interface Listing {
  id?: string;
  title: string;
  address: string;
  county: string;
  bedrooms: number;
  price: number;
  description: string;
  imageUrl: string;
  createdBy: string;
  createdAt: any;
}

/**
 * ListingService handles all Firestore operations for property listings.
 * 
 * DEBUGGING: Access via console with `listingService.methodName()`
 * 
 * Firestore Collection: 'listings'
 * Fields: title, address, county, bedrooms, price, description, imageUrl, createdBy, createdAt
 */
@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private db: firebase.firestore.Firestore;

  constructor() {
    this.db = firebase.firestore();
    
    // Expose for console debugging
    (window as any).listingService = this;
    console.log('ListingService initialized - debug with: listingService.methodName()');
  }

  /**
   * Add a new listing to Firestore
   * @param listing - Listing data (without id and createdAt)
   * @returns Promise with document reference
   */
  addListing(listing: Omit<Listing, 'id' | 'createdAt'>) {
    const user = firebase.auth().currentUser;
    
    if (!user) {
      console.error('addListing failed: User not logged in');
      return Promise.reject('User not logged in');
    }

    const newListing = {
      ...listing,
      createdBy: user.email || user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    console.log('Creating listing:', newListing);
    return this.db.collection('listings').add(newListing);
  }

  /**
   * Get all listings from Firestore, ordered by creation date
   * @returns Promise with array of Listing objects
   */
  getAllListings(): Promise<Listing[]> {
    console.log('Fetching all listings...');
    return this.db.collection('listings')
      .orderBy('createdAt', 'desc')
      .get()
      .then(snapshot => {
        const listings = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Listing));
        console.log('Fetched listings:', listings);
        return listings;
      })
      .catch(error => {
        console.error('getAllListings failed:', error);
        throw error;
      });
  }

  /**
   * Get a single listing by ID
   * @param listingId - Firestore document ID
   * @returns Promise with Listing or null
   */
  getListing(listingId: string): Promise<Listing | null> {
    console.log('Fetching listing:', listingId);
    return this.db.collection('listings').doc(listingId).get()
      .then(doc => {
        if (doc.exists) {
          const listing = { id: doc.id, ...doc.data() } as Listing;
          console.log('Found listing:', listing);
          return listing;
        }
        console.warn('Listing not found:', listingId);
        return null;
      })
      .catch(error => {
        console.error('getListing failed:', error);
        throw error;
      });
  }

  /**
   * Delete a listing by ID
   * @param listingId - Firestore document ID
   */
  deleteListing(listingId: string) {
    console.log('Deleting listing:', listingId);
    return this.db.collection('listings').doc(listingId).delete();
  }

  /**
   * Update a listing
   * @param listingId - Firestore document ID
   * @param data - Partial listing data to update
   */
  updateListing(listingId: string, data: Partial<Listing>) {
    console.log('Updating listing:', listingId, data);
    return this.db.collection('listings').doc(listingId).update(data);
  }

  /**
   * Seed static listings to Firestore (run once to migrate existing data)
   * Console: listingService.seedStaticListings()
   */
  seedStaticListings() {
    const staticListings: Omit<Listing, 'id' | 'createdAt'>[] = [
      {
        title: '93 Priory Grove',
        address: '93 Priory Grove Dublin 4',
        county: 'Dublin',
        bedrooms: 5,
        price: 390000,
        description: 'A beautiful american style detatched house with four bedrooms.',
        imageUrl: 'https://designers.hubspot.com/hubfs/HubDB/house.jpeg',
        createdBy: 'system'
      },
      {
        title: '14 Heathcliffe Close',
        address: '14 Heathcliffe Close Dublin 18',
        county: 'Dublin',
        bedrooms: 3,
        price: 295000,
        description: 'A perfect retreat for when the work is all done, this offering is exactly what a new family or young couple are looking for.',
        imageUrl: 'https://photos.zillowstatic.com/fp/f71358bb883a28ccdeac26d776748a8c-cc_ft_960.jpg',
        createdBy: 'system'
      },
      {
        title: 'Westfield Cottage',
        address: 'Roundwood, Wicklow',
        county: 'Wicklow',
        bedrooms: 2,
        price: 185000,
        description: 'A warm rustic cottage surrounded by the vast beauty Wicklow\'s hills have to offer.',
        imageUrl: 'https://uniqueirishhomes.ie/wp-content/uploads/Castle_view/160114-Sally-Nagle-185-scaled.webp',
        createdBy: 'system'
      },
      {
        title: 'Whitmore Lodge',
        address: 'Schull, Cork',
        county: 'Cork',
        bedrooms: 4,
        price: 425000,
        description: 'A beautiful Holiday escape nestled in the heart of Ireland\'s sunny west coast, Complete with a stunning sea view.',
        imageUrl: 'https://www.nerinstitute.net/sites/default/files/images/house-countryside.jpg',
        createdBy: 'system'
      },
      {
        title: 'Parkview Townhouse',
        address: '45 Parkview, Dublin 4',
        county: 'Dublin',
        bedrooms: 3,
        price: 520000,
        description: 'A Sophisticated and well connected townhouse, with close access to Dublin\'s main trainline and many schools.',
        imageUrl: 'https://www.zillowstatic.com/bedrock/app/uploads/sites/47/agent-or-fsbo-shutterstock_398991412-f5be96.jpg',
        createdBy: 'system'
      }
    ];

    console.log('Seeding', staticListings.length, 'static listings...');
    
    const promises = staticListings.map(listing => {
      return this.db.collection('listings').add({
        ...listing,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    });

    return Promise.all(promises).then(refs => {
      console.log('Static listings seeded! IDs:', refs.map(r => r.id));
      return refs;
    });
  }
}
