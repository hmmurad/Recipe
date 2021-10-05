import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

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
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    const signUpApi =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsIy0glUSTemyFN-dnCwaKCX8YVCG-bHw';
    return this.http
      .post<authResponse>(signUpApi, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.authenticatedUser(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
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
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.authenticatedUser(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _expirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loggedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._expirationDate)
    );
    if (loggedUser.token) {
      this.user.next(loggedUser);
      const expirationDuration =
        new Date(userData._expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.autoLogout(null);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private authenticatedUser(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    console.log('Current User is => ', user);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
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
