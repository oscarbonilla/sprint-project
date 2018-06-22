import { Component, OnInit } from '@angular/core';
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

  constructor(private sprintService : SprintService) { 
    this.title = 'Past Sprints';
    this.getPastSprints(1);
  }

  ngOnInit() {
  }

  // getPastSprintsTest2(page: number){
  //   this.sprintService.getPastSprint().subscribe(res => {
  //     this.sprintService.pastsprints = res as PastSprint[];
  //     this.sprints = res as PastSprint[];
  //   });
  // }
  getPastSprints(page: number){

    this.sprintService.getPastSprint().subscribe((response: PastSprint[]) => {
      this.sprints = response;
      this.sprintService.pastsprints = response;
      //console.log('Data retreived: ' + response);
    });
  }

  DeleteAll(){
    //alert('Test DeleteAll')
    // this.sprintService.deleteAll().subscribe((response: PastSprint[]) => {
    //   this.sprints = response;
    //   this.sprintService.pastsprints = response;      
    // });
    console.log('Before deleted called: ');
    this.sprintService.deleteAll().subscribe(res=> {
      console.log('Result After deleted called: ' + res);
    });
  }

}
