import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonNote, IonLabel, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-listing3',
  templateUrl: './listing3.page.html',
  styleUrls: ['./listing3.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonNote, IonLabel, IonImg]
})
export class Listing3Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
