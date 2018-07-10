import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as auth0 from 'auth0-js'
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service'


(window as any).global = window;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {  
  @ViewChild('userlink') userlink: ElementRef;

  username = '';
  authenticated: boolean = false;
  to;
  constructor(private router: Router, public auth: AuthServiceService) {
    auth.handleAuthentication();
  }

  ngOnInit() {
    this.username = localStorage.getItem('user');
  }
  ngAfterViewInit() {    
    this.username = localStorage.getItem('user');
    if(this.userlink){
      this.userlink.nativeElement.innerHTML = this.username;
     }    
  }
}
