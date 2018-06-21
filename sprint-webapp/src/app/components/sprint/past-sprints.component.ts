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

  constructor(private sprintServ : SprintService) { 
    this.title = 'Past Sprints';
    this.getPastSprints(1);
  }

  ngOnInit() {
  }

  getPastSprints(page: number){
    this.sprintServ.getPastSprint().subscribe(res => {
      this.sprintServ.pastsprints = res as PastSprint[];
    });
  }

}
