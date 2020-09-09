import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OicComponent } from './oic.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'', component:OicComponent,
    children: [
      {
          path: 'home', component: HomeComponent
        },
  
        {
        path: '',
        children: [
          {path:'add-user',component:AddUserComponent}
        ]
      },
      {
        path: '',
        children: [
          {path:'add-issue',component:AddIssueComponent}
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
