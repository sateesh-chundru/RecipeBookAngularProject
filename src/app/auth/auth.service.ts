
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
user = new BehaviorSubject<User>(null);
 tokenExpirationTimer;


    constructor(private http: HttpClient,private router:Router) { }

    signup(email: string, password: string):Observable<AuthResponseData> {
      return  this.http.post<AuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBXFSomDH228hCji2BS9mYb-YHoKoI53rY',
            {
                email: email,
                password: password,
                returnSecureToken: true

            }).pipe(
                catchError(this.handleError), tap(resData =>{
                    this.handleAuthentication(resData);
                })
            );

    }

    login(email: string, password: string){
        return  this.http.post<AuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBXFSomDH228hCji2BS9mYb-YHoKoI53rY',
        {
            email: email,
            password: password,
            returnSecureToken: true

        }).pipe(
            catchError(this.handleError),
            tap(resData =>{
                this.handleAuthentication(resData);
            })
        );
      }

      autoLogin(){
       const userData:{
           email:string,
           id:string,
           _token:string,
           _tokenExpirationDate: string
       }= JSON.parse(localStorage.getItem('userData'));
       if(!userData){
    return
       }

       const loadedUser =new User(userData.email,userData.id,userData._token, new Date(userData._tokenExpirationDate));

       if(loadedUser.token){
           this.user.next(loadedUser);
           const expirationDuration =new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
           this.autoLogout(expirationDuration);
       }
      }

      logout(){
          this.user.next(null);
          this.router.navigate(['/auth']);
          localStorage.removeItem('userData')
          localStorage.clear();
          if(this.tokenExpirationTimer){
              clearTimeout(this.tokenExpirationTimer);
          }
      }

    autoLogout(expirationDuration: number) {
      this.tokenExpirationTimer = setTimeout(() => {
            this.logout()
        }, expirationDuration);

      }
      private handleAuthentication(resData : AuthResponseData){
        const expirationDate = new Date(new Date().getTime()+ +resData.expiresIn*1000);
        const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
         localStorage.setItem('userData',JSON.stringify(user));
        this.user.next(user);
        this.autoLogout(+resData.expiresIn*1000)
      }

      private handleError(errorRes:HttpErrorResponse){
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exists';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password not correct';  
            break;
        }
        return throwError(errorMessage);
      }
}