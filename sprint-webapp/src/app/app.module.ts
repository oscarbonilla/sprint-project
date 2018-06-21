import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './shared/app.routing';

import { SprintComponent } from './components/sprint/sprint.component';
import { AboutComponent } from './components/about/about.component';
import { NewSprintComponent } from './components/sprint/new-sprint.component';
import { PastSprintsComponent } from './components/sprint/past-sprints.component';


@NgModule({
  declarations: [
    AppComponent,
    SprintComponent,
    AboutComponent,    
    NewSprintComponent,
    PastSprintsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
