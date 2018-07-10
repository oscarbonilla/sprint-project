import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PastSprint } from '../../models/past-sprint';
import { SprintService } from '../../services/sprint.service';
import {PushNotificationsModule, PushNotificationsService } from 'ng-push';
import { AuthServiceService } from '../../services/auth-service.service'


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})

export class SpinnerComponent implements OnInit {

  Fulltime: string = "00:00:00";  
  description: any = '';
  name = "";
  duration = 0;
  notify: boolean = false;
  newtitle = "New Sprint";
  radius = 110;
  circumference = 2 * Math.PI * this.radius;
  dashoffset: number;
  percentage: number = 0;
  curPerc: string = this.percentage + ' %';
  interval: any;
  curTime = 0;
  counter = 0;
  timers = [];
  showModal = 'none';
  showFinalModal = 'none';
  completed: boolean = false;
  started: Date = new Date();
  finished: Date = new Date();
  username = "";
  status = "";  
  showErrorMessage = 'none';


  constructor(
    private routeActive: ActivatedRoute,
    private router: Router, 
    private sprintservice: SprintService, 
    private pushNotifications: PushNotificationsService,
    private authService: AuthServiceService
  ) {
    this.setProgress(0);
    this.percentage = 0;
    this.Fulltime = "00:00:00";
  }



  ngOnInit() {
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/']);
    }
    this.pushNotifications.requestPermission();
    this.routeActive.queryParams.subscribe(params => {      
      this.description = params['description'];
      this.notify = params['notify']==='true';
      this.name = params['lengthName'];
      this.duration = params['lengthDuration'];
      this.Fulltime = "00:00:00";
      this.counter = 0;
      this.setTime();

      console.log('Received -> Description: ' + this.description, '- Name: ', this.name, '- Duration:', this.duration, '- Notify:', this.notify);
      this.start();
    });
  }

  private setProgress(value: number) {
    const progress = value / 100;
    this.dashoffset = this.circumference * (1 - progress);
  }
  
  setTime() {

    let hours = 0 //timeNow.getHours();
    let minutes = 0 //timeNow.getMinutes();
    let seconds = 0 //timeNow.getSeconds();   
    let remSec = this.duration - this.counter;

    hours = remSec / 3600
    hours = parseInt(hours.toString());

    minutes = (remSec - hours * 3600) / 60
    minutes = parseInt(minutes.toString());

    seconds = remSec - (hours * 3600 + minutes * 60);
    seconds = parseInt(seconds.toString());

    let timeString = ""
    timeString += ((hours < 10) ? "0" : ":") + hours;
    timeString += ((minutes < 10) ? ":0" : ":") + minutes;
    timeString += ((seconds < 10) ? ":0" : ":") + seconds;

    this.Fulltime = timeString;
    console.log('Remaining seconds: ', remSec, '- Hours: ', hours, '- Minutes: ', minutes, '- Seconds: ', seconds, '- Time: ', timeString);


  }

  setPercentage() {
    this.percentage = this.curTime * 100 / this.duration;
    this.setProgress(this.percentage);
    this.curTime++;
    console.log('Cur time: ', this.curTime);
    this.curPerc = parseInt(this.percentage.toString()) + " %"

    if (this.curTime > this.duration) {
      this.completed = true;
      this.status = "Completed";
      this.stop();
      if(this.notify){        
        this.sendNotification();
      }
    }

  }


  start() {
    if(!this.completed){
      this.interval = setInterval(() => {        
        this.setTime();
        this.setPercentage();
        this.counter++;  
        if(this.counter==1)
          this.started = new Date();      
      }, 1000);      
      this.timers.push(this.interval);
      console.log('ID timer: ', this.interval);
    }    
  }

  
  stop() {    
    this.clearTimer();    
    this.finished = new Date();
    this.showFinalMessage();    
  }

  clearTimer(){
    if (this.timers && this.timers.length > 0) {
      this.timers.forEach(function(value,key){
        console.log('Array Value:',value,'- Key:',key)
        clearTimeout(value);
      })
      this.timers = [];     
    }
  }

  stopSpinner() {
    this.showModal ='block';    
    this.clearTimer();
  }

  cancelSpinner(){
    this.showModal ='none';
    this.clearTimer();
    this.finished = new Date();
    this.status = `Cancelled (at ${ this.curPerc }, time left: ${ this.Fulltime })`;
    this.createPastSprintsByUser();
  }

  restartSpinner(){
    this.showModal ='none';
    this.start();
  }  

  showFinalMessage(){
    this.showFinalModal = 'block';    
  }

  ok(){
    this.showFinalModal = 'none';  
    //this.router.navigate(['/sprint/pastsprints']);  
    this.createPastSprintsByUser();
  }

  createPastSprintsByUser() {
    this.username = localStorage.getItem('user');
    console.log('Creating data for: ', this.username);

    let sprint = new PastSprint();

    sprint.name = this.name;
    sprint.duration = this.duration;
    sprint.status = this.status;
    sprint.progress = parseInt(this.curPerc);
    sprint.description = this.description;
    sprint.notify = this.notify;
    sprint.user = this.username;
    sprint.createdAt = new Date();
    sprint.startedAt = this.started;
    sprint.finishedAt = this.finished;


    this.sprintservice.createPastSprint(sprint).subscribe((response) => {
      console.log('sprintService.createPastSprint', response);
      if (+response.status === 200) {
        this.router.navigate(['/sprint/pastsprints']);
      }else{
        this.showErrorMessage = 'block';
      }
    });
  }

  sendNotification() {
    const options = {
        body: `Your sprint has ended.`,
        icon: '../assets/logo.png'
    };

    this.pushNotifications.create('Timeout!', options)
        .subscribe(res => {
            if (res.event.type === 'click') {
                res.notification.close();

            }

        });
}


  reset() {
    this.setProgress(0);
    this.Fulltime = "00:00:00";
    this.counter = 0;
    this.curPerc = '0 %';
    this.setTime();
    this.curTime = 0;
  }




}
