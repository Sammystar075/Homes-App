import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-listing4',
  templateUrl: './listing4.page.html',
  styleUrls: ['./listing4.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    GoogleMapsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Listing4Page {
  zoom = 8;
  lat = 51.673858;
  lng = 7.815982;

  markers: Marker[] = [
    { lat: 51.673858, lng: 7.815982, label: 'A', draggable: true },
    { lat: 51.373858, lng: 7.215982, label: 'B', draggable: false },
    { lat: 51.723858, lng: 7.895982, label: 'C', draggable: true },
  ];

  clickedMarker(label: string | undefined, index: number) {
    console.log(`clicked the marker: ${label ?? index}`);
  }

  mapClicked($event: any) {
    this.markers.push({
      lat: $event.latLng.lat(),
      lng: $event.latLng.lng(),
      draggable: true,
    });
  }

  markerDragEnd(m: Marker, $event: any) {
    console.log('dragEnd', m, $event);
  }
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

