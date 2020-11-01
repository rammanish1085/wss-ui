import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SessionTimerService} from '../../session-timer/session-timer/session-timer.service';



@NgModule({
  providers: [SessionTimerService],
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SessionTimerModule { }
