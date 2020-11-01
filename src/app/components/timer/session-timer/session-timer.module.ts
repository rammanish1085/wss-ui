import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionTimerComponent } from './session-timer.component';
import {LoginModalComponent} from '../../../modals/login-modal/login-modal.component';
import {LoginModalModule} from '../../../modals/login-modal/login-modal.module';



@NgModule({
  declarations: [SessionTimerComponent],
  exports:[SessionTimerComponent],
  entryComponents:[LoginModalComponent],
  imports: [
    CommonModule,
    LoginModalModule
  ]
})
export class SessionTimerModule { }
