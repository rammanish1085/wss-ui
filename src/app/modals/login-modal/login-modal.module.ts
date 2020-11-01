import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './login-modal.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginModalComponent],
  imports: [
    CommonModule,
   ReactiveFormsModule
  ]
})
export class LoginModalModule { }
