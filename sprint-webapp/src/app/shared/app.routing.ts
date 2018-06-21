import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SprintComponent } from '../components/sprint/sprint.component';
import { PastSprintsComponent } from '../components/sprint/past-sprints.component';
import { NewSprintComponent } from '../components/sprint/new-sprint.component';
import { AboutComponent } from '../components/about/about.component';

const routes: Routes = [
    {
         path: 'sprint', 
         component: SprintComponent,
         children : [            
            { path: 'pastsprints', component: PastSprintsComponent },
            { path: 'newsprint', component: NewSprintComponent }
         ]
    },    
    { path: 'about', component: AboutComponent }
    , { path: '', redirectTo: '/about', pathMatch: 'full'}
  ];

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule {
  
}