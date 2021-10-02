import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { authResponse, AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  islogin = true;
  isloading = false;
  errorMsg = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSwitchMood() {
    this.islogin = !this.islogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isloading = true;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<authResponse>;

    if (this.islogin) {
      authObs = this.authService.signIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      (res) => {
        console.log(res);
        this.isloading = false;
      },
      (errMessage) => {
        console.log(errMessage);
        this.errorMsg = errMessage;
        this.isloading = false;
      }
    );

    form.reset();
  }
}
