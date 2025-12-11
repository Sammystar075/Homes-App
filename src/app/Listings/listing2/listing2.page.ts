import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonNote, IonLabel, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-listing2',
  templateUrl: './listing2.page.html',
  styleUrls: ['./listing2.page.scss'],
  standalone: true,
  imports: [IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonNote, IonLabel ]
})
export class Listing2Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
