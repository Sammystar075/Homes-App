import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ui: any; 

  constructor(
    private router: Router, 
    private ngZone: NgZone 
  ) {
    // Force Init
    if (firebase.apps.length === 0) {
      firebase.initializeApp(environment.firebase);
    }

    // Expose firebase globally for debugging in console
    (window as any).firebase = firebase;
    (window as any).authService = this;

    if (firebaseui.auth.AuthUI.getInstance()) {
      this.ui = firebaseui.auth.AuthUI.getInstance();
    } else {
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
  }

  getUiConfig() {
    return {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult: any) => {
          console.log('Login successful!', authResult.user.uid);
          
          // <--- 3. THE FIX: Redirect to Tab 1
          // We use ngZone.run() to make sure Angular sees this update immediately
          this.ngZone.run(() => {
            this.router.navigate(['tabs/tab1']);
          });

          return false; // Prevent the default FirebaseUI redirect
        },
        signInFailure: (error: any) => {
          console.error('Login failed', error);
        }
      },
      signInFlow: 'popup',
      credentialHelper: firebaseui.auth.CredentialHelper.NONE
    };
  }
  checkAuthStatus() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('User is logged in:', user.uid, user.email);
        // User is authenticated, redirect to tabs if on login page
        this.ngZone.run(() => {
          const currentUrl = this.router.url;
          if (currentUrl === '/login' || currentUrl === '') {
            this.router.navigate(['/tabs/tab1']);
          }
        });
      } else {
        console.log('No user logged in');
        // No user, redirect to login
        this.ngZone.run(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }

getCurrentUser() {
  return firebase.auth().currentUser;
}

  startUi(elementId: string) {
    // Wait for FirebaseUI to be available
    if (typeof (window as any).firebaseui === 'undefined') {
      console.error('FirebaseUI not loaded');
      return;
    }

    const container = document.getElementById(elementId);
    if (!container) {
      console.error(`Element with id "${elementId}" not found`);
      return;
    }

    console.log('Starting FirebaseUI in element:', elementId);

    if (this.ui.isPendingRedirect()) {
      this.ui.start(`#${elementId}`, this.getUiConfig());
    } else {
      this.ui.reset();
      this.ui.start(`#${elementId}`, this.getUiConfig());
    }
  }

  stopUi() {
    if (this.ui) {
      this.ui.delete();
    }
  }
}