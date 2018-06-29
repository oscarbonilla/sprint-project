import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SprintTemplate } from '../models/sprint-template';

let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
let options = ({ headers: headers });

@Injectable({
  providedIn: 'root'
})
export class SprinttemplateService {
  templates : SprintTemplate[] = [];
  readonly url = 'http://localhost:3000/api/templates';

  constructor(private http: HttpClient) { }

  getSprintTemplates(): Observable<SprintTemplate[]> {
    return this.http.get<SprintTemplate[]>(this.url,options)
      .map((templates: SprintTemplate[]) => {
        return templates;
      })
      .catch(this.handleError);
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
}
