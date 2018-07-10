import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
//import { HeaderComponent } from '../components/header/header.component'

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  auth0 = new auth0.WebAuth({
    clientID: 'lw9F9kbTJSSx-BoYDy_8e-3AopeVYChf',
    domain: 'oscarbc.auth0.com',
    responseType: 'token id_token',
    audience: 'https://oscarbc.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/sprint',
    scope: 'openid profile'
  });

  userconnected = '';

  constructor(private router: Router) { }

  public login(): void {
    this.auth0.authorize();
    console.log('Auth service: setSession: User connected:', this.userconnected);
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('user', authResult.idTokenPayload.name);
    this.userconnected = authResult.idTokenPayload.name;
    console.log('Auth service: setSession: User connected:', this.userconnected);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    this.userconnected = localStorage.getItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');

    console.log('Auth service: logout: User deconnected:', this.userconnected);
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public getUser() {
    return localStorage.getItem('user');
  }

}
