import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface authResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiKey = 'AIzaSyDsIy0glUSTemyFN-dnCwaKCX8YVCG-bHw';
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    const signUpApi =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsIy0glUSTemyFN-dnCwaKCX8YVCG-bHw';
    return this.http
      .post<authResponse>(signUpApi, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.errorHandler));
  }

  signIn(email: string, password: string) {
    return this.http
      .post<authResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDsIy0glUSTemyFN-dnCwaKCX8YVCG-bHw',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(errRes: HttpErrorResponse) {
    let errMessage = 'An unknown error occured!';
    if (!errRes.error || !errRes.error.error) {
      return throwError(errMessage);
    }
    switch (errRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errMessage = 'Your email exists already!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errMessage = 'Already you have tried too many times, please try later!';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errMessage = 'Your are not allowd here!';
        break;
      case 'EMAIL_NOT_FOUND':
        errMessage = 'This email is not found here!';
        break;
      case 'INVALID_PASSWORD':
        errMessage =
          'Your password is not correct, please try with right password!';
        break;
      case 'USER_DISABLED':
        errMessage = 'Your account is disable by admin!';
        break;
    }
    return throwError(errMessage);
  }
}
