import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OicRoutingModule } from './oic-routing.module';
import { OicComponent } from './oic.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';




@NgModule({
  declarations: [OicComponent,NavbarComponent,SidebarComponent, AddUserComponent,FooterComponent, AddIssueComponent, HomeComponent,DashboardComponent],
  imports: [
    CommonModule,
    OicRoutingModule
  ]
})
export class OicModule { }
