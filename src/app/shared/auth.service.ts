import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authApi =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsIy0glUSTemyFN-dnCwaKCX8YVCG-bHw';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    const signUpApi =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsIy0glUSTemyFN-dnCwaKCX8YVCG-bHw';
    this.http.post(signUpApi, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
