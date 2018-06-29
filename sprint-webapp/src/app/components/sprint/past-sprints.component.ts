import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintService } from '../../services/sprint.service';
import { PastSprint } from '../../models/past-sprint';

@Component({
  selector: 'app-past-sprints',
  templateUrl: './past-sprints.component.html',
  styleUrls: ['./past-sprints.component.css']
})
export class PastSprintsComponent implements OnInit {
  title: string;
  totalRecords: number = 0;
  pageSize: number = 10;
  sprints : PastSprint[] = [];
  username : string = "";

  constructor(private sprintService : SprintService,private routeActive: ActivatedRoute,private router: Router) { 
    this.title = 'Past Sprints';
    //this.getPastSprints(1);
    this.getPastSprintsByUser();
  }

  ngOnInit() {
  }

  
  getPastSprints(page: number){

    this.sprintService.getPastSprint().subscribe((response: PastSprint[]) => {
      this.sprints = response;
      this.sprintService.pastsprints = response;
      //console.log('Data retreived: ' + response);
    });
  }

  getPastSprintsByUser(){
    this.username = localStorage.getItem('user');
    console.log('Retreiving data for: ',this.username);
    this.sprintService.getPastSprintsByUser(this.username).subscribe((response: PastSprint[]) => {
      this.sprints = response;
      this.sprintService.pastsprints = response;      
    });
  }

  DeleteAll(){        
    console.log('Deleting all data');    
    this.sprintService.deleteAll1().subscribe(res=> {      
      //this.getPastSprints(1);
      this.router.navigate(['/sprint/pastsprints']);          
    });
  }

  DeletePastSpritnsByUser(){        
    this.username = localStorage.getItem('user');
    console.log('Deleting data for: ',this.username);

    this.sprintService.deletePastSprintByUser(this.username).subscribe(res=> {      
      this.getPastSprintsByUser();
    });
  }

}
