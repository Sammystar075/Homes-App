import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

// 1. Import the Firebase modules so the test "knows" about Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// 2. Import your environment config
// Note: Depending on your folder structure, you might need to adjust the '../'
// This assumes your file is in src/app/services/auth/
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // 3. Configure the "Fake" Test Module with Firebase
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
      ],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  // 4. The actual test: Does the service exist?
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});