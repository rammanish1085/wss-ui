import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizationService } from './services/authorization-service/authorization.service';
import { LoginService } from './services/login/login-service/login.service';
import { LogoutService } from './services/logout/logout-service/logout.service';
import { GlobalConfiguration } from './config/global.config';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { AuthorizationInterceptor } from '../app/interceptor/authorization.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthGuard} from 'src/app/guard/auth.guard'
import {GlobalConstants} from 'src/app/utility/global.constants';
import {SessionTimerModule} from 'src/app/services/session-timer/session-timer/session-timer.module';
import { NavbarComponent } from './components/navbar/nav-bar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
   
         ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
    
    
     ],
  providers: [
    AuthorizationService,
    LoginService,
    LogoutService,
    GlobalConfiguration,
    GlobalConstants,
    HttpClient,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    }
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
