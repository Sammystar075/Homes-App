import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonList, IonItem, IonLabel, IonNote, IonButton } from '@ionic/angular/standalone';
import { BookingService } from '../../services/booking/booking.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-listing1',
  templateUrl: './listing1.page.html',
  styleUrls: ['./listing1.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonList, IonItem, IonLabel, IonNote, IonButton, CommonModule, FormsModule]
})
export class Listing1Page {
  propertyName: string = '93 Priory Grove';

  constructor(private bookingService: BookingService) {}

  bookNow() {
    const user = firebase.auth().currentUser;

    if (!user || !user.email) {
      alert('Please log in first');
      return;
    }

    this.bookingService.bookProperty(user.email, this.propertyName)
      .then((docRef) => {
        console.log('Booking created with ID:', docRef.id);
        alert('Booking confirmed for ' + this.propertyName);
      })
      .catch((error) => {
        console.error('Booking failed:', error);
        alert('Booking failed: ' + error.message);
      });
  }
}
