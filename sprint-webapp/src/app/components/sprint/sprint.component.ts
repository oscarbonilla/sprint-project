import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  showPastSprints(){
    this.router.navigate(['pastsprints'],{relativeTo: this.route});    
  }
  
  showNewSprint(){
    this.router.navigate(['newsprint'],{relativeTo: this.route});    
  }


}
