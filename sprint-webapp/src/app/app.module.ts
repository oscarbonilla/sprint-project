import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PushNotificationsModule } from 'ng-push';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './shared/app.routing';

import { SprintComponent } from './components/sprint/sprint.component';
import { AboutComponent } from './components/about/about.component';
import { NewSprintComponent } from './components/sprint/new-sprint.component';
import { PastSprintsComponent } from './components/sprint/past-sprints.component';
import { HeaderComponent } from './components/header/header.component';
import { FormatDurationPipe } from './customfilters/format-duration.pipe';
import { SpinnerComponent } from './components/sprint/spinner.component';
import { AutofocusDirective } from './shared/autofocus.directive';


@NgModule({
  declarations: [
    AppComponent,
    SprintComponent,
    AboutComponent,    
    NewSprintComponent,
    PastSprintsComponent,
    HeaderComponent,
    FormatDurationPipe,
    SpinnerComponent,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    PushNotificationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
