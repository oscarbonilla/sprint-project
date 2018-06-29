import { Component, OnInit } from '@angular/core';
import * as auth0  from 'auth0-js'
import { Router } from '@angular/router';

(window as any).global = window;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username = ''
  authenticated: boolean = false;

  auth0 = new auth0.WebAuth({
    clientID: 'lw9F9kbTJSSx-BoYDy_8e-3AopeVYChf',
    domain: 'oscarbc.auth0.com',
    responseType: 'token id_token',
    audience: 'https://oscarbc.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/sprint',
    scope: 'openid profile'
  });

  constructor(private router: Router) { 
    this.handleAuthentication();
  }

  ngOnInit() {
  }

  public LogIn(){    
    this.auth0.authorize();
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
  }

  public LogOut(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    this.authenticated = new Date().getTime() < expiresAt;
    if(this.authenticated)
      this.username = localStorage.getItem('user');
    return this.authenticated
  }

}
