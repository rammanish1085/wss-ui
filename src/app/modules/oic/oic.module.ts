import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OicRoutingModule } from './oic-routing.module';
import { OicComponent } from './oic.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AddUserComponent } from './add-user/add-user.component';




@NgModule({
  declarations: [OicComponent,NavbarComponent,SidebarComponent, AddUserComponent,FooterComponent],
  imports: [
    CommonModule,
    OicRoutingModule
  ]
})
export class OicModule { }
