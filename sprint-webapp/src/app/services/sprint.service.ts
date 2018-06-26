import { Injectable } from '@angular/core';

//Using the new HttpClientModule now. If you're still on < Angular 4.3 see the 
//data.service.ts file instead (simplify rename it to the name 
//of this file to use it instead)
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { PastSprint } from '../models/past-sprint';
import { Options } from 'selenium-webdriver/opera';
// import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
// import { map } from 'rxjs/operators';


let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
// headers.append('Access-Control-Allow-Origin', '*');
// headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// headers.append('Access-Control-Allow-Credentials', 'true');
let options = ({ headers: headers });


@Injectable({
  providedIn: 'root'
})
//@Injectable()
export class SprintService {
  readonly url = 'http://localhost:3000/api/sprints';
  pastsprints: PastSprint[] = [];

  constructor(private http: HttpClient) { }

  getPastSprint(): Observable<PastSprint[]> {
    return this.http.get<PastSprint[]>(this.url,options)
      .map((sprints: PastSprint[]) => {
        return sprints;
      })
      .catch(this.handleError);
  }

  deleteAll1():  Observable<PastSprint[]> {
    return this.http.delete<PastSprint[]>(this.url,options)
      .map((sprints: PastSprint[]) => {
        return sprints;
      })
      .catch(this.handleError);
  }

  deleteAll(){    
    return this.http.delete(this.url,options).map(res=>res).catch(this.handleError);    
  }


  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      //return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Node.js server error');
  }

  // getPastSprintTest1() : Observable<any>{
  //   return this.http.get(this.url, {responseType: 'json'});
  // }

}
