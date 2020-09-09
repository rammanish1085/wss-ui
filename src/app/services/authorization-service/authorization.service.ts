import {LoginService} from '../login/login-service/login.service';
import {LogoutService} from '../logout/logout-service/logout.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { Response} from '@angular/http';
import { GlobalConfiguration } from '../../config/global.config';
import { User } from '../../models/user.model';
import { Router } from "@angular/router";
@Injectable()
export class AuthorizationService {

  private readonly SESSION_END_TIME_KEY = "session_horcrux";
  private readonly TOKEN_KEY = "ngb_horcrux";
  private AUTHENTICATION_URL;
  private AUTHORIZATION_HEADER_TEXT = "Authorization";
  private jwtHelper: JwtHelperService;
  private sessionEndTime;

  constructor(private router: Router, private globalConfiguration: GlobalConfiguration,
    private loginService: LoginService, private logoutService: LogoutService) {
    this.jwtHelper = new JwtHelperService();
    this.AUTHENTICATION_URL = this.globalConfiguration.getAuthenticationURL();
  }

  public authenticate(user: User) {
    //clearing sessionEndTime so that new sessionEndTime can be calculated
    //after login
    this.setSessionEndTime(null);
    //return this.loginService.authenticate(user);
    return this.loginService.authenticate(user, true);
  }

  public getLoggedInUserRole(): string {
    let token: string = this.getToken();
    let decodedToken = this.jwtHelper.decodeToken(token);
    if (decodedToken) {
      //return decodedToken.role;
      return decodedToken.user.role;
    } else {
      return null;
    }
  }

  public getToken(): string {
    let currentToken = sessionStorage.getItem(this.TOKEN_KEY);
    return currentToken ? currentToken : "";
  }

  public isLogedIn(): boolean {
    let token: string = this.getToken();
    return token && token.length > 0;
  }

  public getLoggedInUser(): User {
    let methodName: string = "getLoggedInUser() : ";

    let token: string = this.getToken();
    if (!token || token.length == 0) {
      console.error(methodName + "invalid token " + token);
      return null;
    }

    let decodedToken = this.jwtHelper.decodeToken(token);
    if (!decodedToken) {
      console.error(methodName + "invalid decoded-token " + decodedToken);
      return null;
    }

    let user: User = new User(null);
    user.setId(decodedToken.user.id);
    user.setUsername(decodedToken.user.username);
    user.setRole(decodedToken.user.role);
    user.setName(decodedToken.user.name);
    user.setDesignation(decodedToken.user.designation);
    user.setLocationCode(decodedToken.user.locationCode);
    user.setMobileNo(decodedToken.user.mobileNo);
    user.setStatus(decodedToken.user.status);
    user.setSessionId(decodedToken.sessionId);
    user.setZone(decodedToken.user.zone);
    user.setGenerator(decodedToken.generator);

    return user;
  }

  public getLoggedInUserGenerator(): any {
    let methodName: string = "getLoggedInUserGenerator() : ";

    let token: string = this.getToken();
    if (!token || token.length == 0) {
      console.error(methodName + "invalid token " + token);
      return null;
    }

    let decodedToken = this.jwtHelper.decodeToken(token);
    if (!decodedToken) {
      console.error(methodName + "invalid decoded-token " + decodedToken);
      return null;
    }

    return decodedToken.generator;
  }

  public getConsumerNoPrefix(): any {
    console.log("preparing consumerNoPrefix");

    let user: User = this.getLoggedInUser();
    if (!user) return null;

    let generator = user.getGenerator();
    if (!generator) {
      console.error("No Generator Found for loggedInUser");
      return null;
    }

    let discomCode = generator.discomCode;
    let trailingCode = generator.trailingCode;

    return discomCode + trailingCode;
  }

  public logout() {
    console.log("Logout called in Authorization Service");
    let loggedInUser: User = this.getLoggedInUser();
    if (loggedInUser) {
      console.log("Logging out user with sessionId " + loggedInUser.getSessionId());
      this.logoutService.logoutSession(loggedInUser.getSessionId(), this.getToken()).subscribe(success => {
        console.log("Logout successfull. Redirecting to login page");
      }, error => {
        console.log("Error while logging out");
        console.log(error);
      });
    }

    this.clearStorage(this.TOKEN_KEY);
    this.clearStorage(this.SESSION_END_TIME_KEY);
    
    this.router.navigate(['login']);
  }

  //This function only logout the current session & clears the session storage without navigating to login page
  public sessionLogout() {
    let methodName: string = "sessionLogout() : ";
    console.log(methodName + "called in Authorization Service");
    let loggedInUser: User = this.getLoggedInUser();
    if (loggedInUser) {
      console.log(methodName + "Logging out user's session with sessionId " + loggedInUser.getSessionId());
      this.logoutService.logoutSession(loggedInUser.getSessionId(), this.getToken()).subscribe(success => {
        console.log(methodName + "Session Logout successfull");
      }, error => {
        console.error(methodName + "Error while logging out session with sessionId " + loggedInUser.getSessionId());
        console.error(error);
      });
    }

    this.clearStorage(this.TOKEN_KEY);
    this.clearStorage(this.SESSION_END_TIME_KEY);
  }

  public setSessionEndTime(sessionEndTime) {
    console.log("setSessionEndTime called");
    this.sessionEndTime = sessionEndTime;
    if (sessionEndTime === null || sessionEndTime === undefined) {
      this.clearStorage(this.SESSION_END_TIME_KEY);
    }
  }

  public getSessionEndTime() {
    if (this.sessionEndTime) return this.sessionEndTime;

    let sessionEndTime = sessionStorage.getItem(this.SESSION_END_TIME_KEY);
    this.sessionEndTime = sessionEndTime ? sessionEndTime : undefined;
    return this.sessionEndTime;
  }

  private clearStorage(key) {
    sessionStorage.removeItem(key);
  }
}
