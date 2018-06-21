import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-sprint',
  templateUrl: './new-sprint.component.html',
  styleUrls: ['./new-sprint.component.css']
})
export class NewSprintComponent implements OnInit {
  title: string;
  totalRecords: number = 0;
  pageSize: number = 10;

  constructor() {
    this.title = 'New Sprint';
  }

  ngOnInit() {

  }

  CreateNewSprint(){

  }

}
