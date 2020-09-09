import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OicComponent } from './oic.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {
    path:'', component:OicComponent,
    children: [
      {
        path: '',
        children: [
          {path:'add',component:AddUserComponent}
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
