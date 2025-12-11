import { Component, OnDestroy } from '@angular/core';
import { ViewDidEnter, ViewWillLeave } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})
export class LoginPage implements ViewDidEnter, ViewWillLeave, OnDestroy {

  constructor(private authService: AuthService) {}

  // Runs when the page is fully visible
  ionViewDidEnter() {
    // Wait a tick to ensure DOM is ready
    setTimeout(() => {
      const container = document.getElementById('firebaseui-auth-container');
      if (container) {
        console.log('Starting FirebaseUI');
        this.authService.startUi('firebaseui-auth-container');
      } else {
        console.error('firebaseui-auth-container element not found');
      }
    }, 100);
  }

  // Runs when you leave the page
  ionViewWillLeave() {
    this.authService.stopUi();
  }

  // Runs if the component is destroyed
  ngOnDestroy() {
    this.authService.stopUi();
  }
}