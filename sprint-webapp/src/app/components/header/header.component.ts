import { Component, OnInit } from '@angular/core';
import * as auth0  from 'auth0-js'
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service'

(window as any).global = window;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username = ''
  authenticated: boolean = false;

  constructor(private router: Router,public auth: AuthServiceService) { 
    //this.handleAuthentication();    
    auth.handleAuthentication();
  }

  ngOnInit() {
    //console.log('Header OnInit.......');    
    this.username = localStorage.getItem('user');
  }

  
 
}
