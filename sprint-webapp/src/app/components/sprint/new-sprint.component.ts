import { Component, OnInit } from '@angular/core';
import { SprintService } from '../../services/sprint.service';
import { SprinttemplateService } from '../../services/sprinttemplate.service';

import { PastSprint } from '../../models/past-sprint';
import { SprintTemplate } from '../../models/sprint-template'
import { ActivatedRoute, Router } from '@angular/router';

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
  pastsprint : PastSprint;
  templates : SprintTemplate[] = [];
  selectedTemplate: SprintTemplate;
  notify: boolean = false;
  description: string;
  


  constructor(private sprintService : SprintService,private templateService: SprinttemplateService ,private routeActive: ActivatedRoute,private router: Router) { 
    this.newtitle = 'New Sprint';    
  }

  ngOnInit() {
    this.getTemplates();
  }

  CreateNewSprint(){
    this.username = localStorage.getItem('user');
    console.log('Testing New Sprint function for: ',this.username);
  }

  getTemplates(){
    //this.templates =  
    this.templateService.getSprintTemplates().subscribe((response: SprintTemplate[]) =>{
      console.log('templateService.getSprintTemplates',response);      
      this.templates = response;
      if (this.templates.length > 0) {
        this.selectedTemplate = this.templates[0];
      }
    })  
    
  }

  createPastSprintsByUser(){
    this.username = localStorage.getItem('user');    
    console.log('Creating data for: ',this.username);

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
      console.log('sprintService.createPastSprint',response);      
       if (+response.status === 200){        
         this.router.navigate(['/sprint/pastsprints']);          
       } 
    });
  }
 

}
