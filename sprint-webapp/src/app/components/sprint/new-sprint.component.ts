import { Component, OnInit, ViewChild } from '@angular/core';
import { SprintService } from '../../services/sprint.service';
import { SprinttemplateService } from '../../services/sprinttemplate.service';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service'

import { PastSprint } from '../../models/past-sprint';
import { SprintTemplate } from '../../models/sprint-template'
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-new-sprint',
  templateUrl: './new-sprint.component.html',
  styleUrls: ['./new-sprint.component.css']
})


export class NewSprintComponent implements OnInit {
  newtitle: string;
  totalRecords: number = 0;
  pageSize: number = 10;
  username: string = "";
  pastsprint: PastSprint;
  templates: SprintTemplate[] = [];
  selectedTemplate: SprintTemplate;
  notify: boolean = false;
  description: string;
  display = 'none';
  submitted = false;  



  public selectedValue: any = '';


  constructor(
    private sprintService: SprintService, 
    private templateService: SprinttemplateService, 
    private routeActive: ActivatedRoute, 
    private router: Router,
    private authService: AuthServiceService
  ) {
    this.newtitle = 'New Sprint';    
  }

  ngOnInit() {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/']);
    }
    this.username = localStorage.getItem('user');
    this.getTemplates();
  }

  /* New Section   */



  createSpinner(form: NgForm) {
    this.submitted = true;
    console.log('Formulaire: ', form.value);

    const  NavigationExtras: NavigationExtras  = {
      queryParams: {
        'description' : form.value.description ,
        'lengthName' : form.value.length.name,
        'lengthDuration' : form.value.length.duration,
        'notify' : form.value.notify
      },
      fragment: 'anchor'
    };
    this.router.navigate(['/spinner'], NavigationExtras);
  }

  cancelSpinner() {

  }

  //End New Section

  CreateNewSprint() {
    this.username = localStorage.getItem('user');
    console.log('Testing New Sprint function for: ', this.username);
  }

  getTemplates() {
    this.templateService.getSprintTemplates().subscribe((response: SprintTemplate[]) => {
      console.log('templateService.getSprintTemplates', response);
      this.templates = response;
      if (this.templates.length > 0) {
        this.selectedTemplate = this.templates[0];
      }
    })

  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }


  createPastSprintsByUser() {
    this.username = localStorage.getItem('user');
    console.log('Creating data for: ', this.username);

    let sprint = new PastSprint();

    sprint.name = this.selectedTemplate.name;
    sprint.duration = this.selectedTemplate.duration;
    sprint.status = "Cancelled";
    sprint.progress = 20;
    sprint.description = this.description;
    sprint.notify = this.notify;
    sprint.user = this.username;
    sprint.createdAt = new Date();
    sprint.startedAt = new Date();
    sprint.finishedAt = new Date();


    this.sprintService.createPastSprint(sprint).subscribe((response) => {
      console.log('sprintService.createPastSprint', response);
      if (+response.status === 200) {
        this.router.navigate(['/sprint/pastsprints']);
      }
    });
  }

  // onAddPost(_form: NgForm) {

  //   // if  ( _form.invalid) {
  //   //   alert('please innput description');
  //   //   return;
  //   // }

  //   console.log(this.selectedValue);
  //     console.log(_form.value);
  //     // tslint:disable-next-line:no-shadowed-variable
  //     const NavigationExtras:  NavigationExtras = {
  //     queryParams :  {'description' : _form.value.description , 'length' : _form.value.length },
  //     fragment : 'anchor'
  //     };
  //    this.router.navigate(['/spinner'] , NavigationExtras);
  // }


}
