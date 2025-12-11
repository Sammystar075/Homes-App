import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private db: firebase.firestore.Firestore;

  constructor() {
    this.db = firebase.firestore();
    
    // Expose for console debugging
    (window as any).bookingService = this;
  }

  // Book a property
  bookProperty(email: string, property: string) {
    const booking = {
      email: email,
      property: property,
      time: firebase.firestore.FieldValue.serverTimestamp()
    };

    console.log('Creating booking:', booking);

    return this.db.collection('bookings').add(booking);
  }

  // Get all bookings
  getAllBookings() {
    return this.db.collection('bookings').get();
  }

  // Get bookings by email
  getBookingsByEmail(email: string) {
    return this.db.collection('bookings').where('email', '==', email).get();
  }

  // Delete a booking
  deleteBooking(bookingId: string) {
    return this.db.collection('bookings').doc(bookingId).delete();
  }
}