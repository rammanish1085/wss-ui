import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OicRoutingModule } from './oic-routing.module';
import { OicComponent } from './oic.component';
import { NavbarComponent } from '../../components/navbar/nav-bar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewIssueComponent } from './view-issue/view-issue.component';
import { TrackIssueComponent } from './track-issue/track-issue.component';
import { RequestNotificationComponent } from './request-notification/request-notification.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {SessionTimerComponent} from 'src/app/components/timer/session-timer/session-timer.component';
import {LoginModalModule} from 'src/app/modals/login-modal/login-modal.module';





@NgModule({
  declarations: [OicComponent,NavbarComponent,SessionTimerComponent,SidebarComponent, AddUserComponent,FooterComponent, AddIssueComponent, HomeComponent,DashboardComponent, ViewIssueComponent, TrackIssueComponent, RequestNotificationComponent],
  imports: [
    CommonModule,
    OicRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    LoginModalModule
    // SessionTimerModule,
    // NavBarModule
  ]
})
export class OicModule { }
