import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintService } from '../../services/sprint.service';
import { PastSprint } from '../../models/past-sprint';
import { PagerserviceService } from '../../services/pagerservice.service'
import { AuthServiceService } from '../../services/auth-service.service'

@Component({
  selector: 'app-past-sprints',
  templateUrl: './past-sprints.component.html',
  styleUrls: ['./past-sprints.component.css']
})
export class PastSprintsComponent implements OnInit {
  title: string;
  totalRecords: number = 0;
  ItemsPage: number = 5;
  sprints: PastSprint[] = [];
  pastSprintTemp: PastSprint[] = [];
  username: string = "";
  pager: any = {};
  SearchText = '';  
  TotalRecords = 0;

  constructor(
    private sprintService: SprintService, 
    private routeActive: ActivatedRoute, 
    private router: Router, 
    private pagerService: PagerserviceService,
    private authService: AuthServiceService
  ) {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/']);
    }else{
      this.getPastSprintsByUser();
    }
    this.title = 'Past Sprints';    
    
  }

  ngOnInit() {  
    const ipp = localStorage.getItem('ItemsPerPage');
    if(ipp && parseInt(ipp)>0){
      this.setItemsPerPage(parseInt(ipp));
    }
  }

  
  searchPastSprint(value : string){
    //console.log('Search records:',value);    
    this.SearchText  = value;
    this.setPage(0);
  }


  setPage(page: number) {
    
    if(this.SearchText){
      this.pastSprintTemp  =  this.sprintService.pastsprints.filter(ps=>
        (ps.name + '(' + (this.convertDuration(ps.duration))+')').toUpperCase().indexOf(this.SearchText.toUpperCase()) !== -1 ||
        ps.status.toUpperCase().indexOf(this.SearchText.toUpperCase()) !== -1 ||
        this.convertDateToString(ps.createdAt.toString()).indexOf(this.SearchText) !== -1 ||
        ps.description.toUpperCase().indexOf(this.SearchText.toUpperCase()) !== -1
      )
    }else{
      this.pastSprintTemp = this.sprintService.pastsprints;
    }

    this.pastSprintTemp = this.pastSprintTemp.sort((a,b)=>{
      return  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })

    this.TotalRecords = this.pastSprintTemp.length;

    // get pager object from service    
    this.pager = this.pagerService.getPager(this.pastSprintTemp.length, page, this.ItemsPage);

    // get current page of items
    this.sprintService.pastsprintsFiltered = this.pastSprintTemp.slice(this.pager.startIndex, this.pager.endIndex + 1);

  }

    

  convertDuration(value: any): string {
    return value > 60 ? value / 60 + ' Minutes' : value + ' Seconds'
  }

  convertDateToString(date: string) : string{    
    const paramFec = new Date(date);
    
    let y = paramFec.getFullYear();    
    let m = paramFec.getMonth()+1;
    let d = paramFec.getDay()+1;

    let h = paramFec.getHours();
    let min = paramFec.getMinutes();

    let sy = y.toString();
    let sm = m < 10 ? '0'+m : m;
    let sd = d < 10 ? '0'+d : d;
    
    let sh = h < 10 ? '0'+h : h;
    let smin = min < 10 ? '0'+min : min;
    
    let fulldate = sd + '-' + sm + '-' + sy + ' ' + sh + ':' + smin ;
    
    //console.log('Name:',name, ' - convertDateToString:', date, 'paramFec:', paramFec,'Year:',y,'Month:',m,'Day',d,'Full date:',fulldate);

    return fulldate
  }

  getPastSprints(page: number) {

    this.sprintService.getPastSprint().subscribe((response: PastSprint[]) => {
      this.sprints = response;
      this.sprintService.pastsprints = response;
      //console.log('Data retreived: ' + response);
    });
  }

  getPastSprintsByUser() {
    this.username = localStorage.getItem('user');
    console.log('Retreiving data for: ', this.username);
    this.sprintService.getPastSprintsByUser(this.username).subscribe((response: PastSprint[]) => {
      this.sprints = response;
      this.sprintService.pastsprints = response;
      this.setPage(1);
    });
  }

  DeleteAll() {
    console.log('Deleting all data');
    this.sprintService.deleteAll1().subscribe(res => {
      //this.getPastSprints(1);
      this.router.navigate(['/sprint/pastsprints']);
    });
  }

  DeletePastSpritnsByUser() {
    if(!confirm("Are you sure to delete?")) {      
      return;
    }

    this.username = localStorage.getItem('user');
    console.log('Deleting data for: ', this.username);

    this.sprintService.deletePastSprintByUser(this.username).subscribe(res => {
      this.getPastSprintsByUser();
    });
  }

  setItemsPerPage(number){
    this.ItemsPage = number; 
    this.setPage(1);
    localStorage.setItem("ItemsPerPage",this.ItemsPage.toString());
  }

}
