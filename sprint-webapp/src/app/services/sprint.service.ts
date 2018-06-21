import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { PastSprint } from '../models/past-sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  readonly url = 'http://localhost:3000/api/sprints';  
  pastsprints: PastSprint[];

  constructor(private http: HttpClient) { 

  }

  getPastSprint(){
    return this.http.get(this.url);
  }

}
