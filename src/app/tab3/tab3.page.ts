import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonToggle, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonToggle, IonItem, IonLabel],
})
export class Tab3Page implements OnInit {
  darkMode: boolean = false;

  constructor() {}

  ngOnInit() {
    // Check for saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      this.darkMode = savedMode === 'true';
    } else {
      // Use system preference as default
      this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyDarkMode();
  }

  /**
   * Toggle dark mode on/off
   */
  toggleDarkMode(event: any) {
    this.darkMode = event.detail.checked;
    localStorage.setItem('darkMode', String(this.darkMode));
    this.applyDarkMode();
    console.log('Dark mode:', this.darkMode ? 'ON' : 'OFF');
  }

  /**
   * Apply dark mode to document
   */
  private applyDarkMode() {
    // Toggle the 'ion-palette-dark' class on the html element
    // This overrides the @media (prefers-color-scheme: dark) query
    document.documentElement.classList.toggle('ion-palette-dark', this.darkMode);
  }
}
