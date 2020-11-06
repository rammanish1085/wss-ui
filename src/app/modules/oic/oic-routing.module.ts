import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OicComponent } from './oic.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewIssueComponent } from './view-issue/view-issue.component';
import { TrackIssueComponent } from './track-issue/track-issue.component';
import { RequestNotificationComponent } from './request-notification/request-notification.component';
import { ToDoIssueComponent } from './to-do-issue/to-do-issue.component';

const routes: Routes = [
  {
    path:'', component:OicComponent,canActivate: [AuthGuard],
    
    children: [
      {
                
        path: '',
        canActivateChild: [AuthGuard],
        children: [

         { path: 'home', 
           component: HomeComponent
        },
          {
            path:'add-user',
            component:AddUserComponent
          },
          {
            path:'add-issue',
            component:AddIssueComponent

          },

          {
            path:'view-issue',
            component:ViewIssueComponent

          },

          {
            path:'track-issue',
            component:TrackIssueComponent

          },

          {
            path:'dashboard',
            component:DashboardComponent
          },

          {
            path:'notification',
            component:RequestNotificationComponent
          },

          {
            path:'to-do-issue',
            component:ToDoIssueComponent
          },
          {
            path: '', redirectTo: 'home', pathMatch: 'full'
          }
        ]
      }     
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OicRoutingModule { }
