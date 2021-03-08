import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../auth.service';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-auth-componet',
  templateUrl: './auth-componet.component.html',
  styleUrls: ['./auth-componet.component.css']
})   
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error:string;
  
  constructor(private authService:AuthService, private router:Router ){

  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    let authObservable:Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObservable=this.authService.login(email, password)
    } else {
      authObservable=this.authService.signup(email, password)
    }

    authObservable.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        console.log(errorMessage);
        debugger;
       this.error=errorMessage;
        this.isLoading = false;
      });
    form.reset();

  }

 



}
