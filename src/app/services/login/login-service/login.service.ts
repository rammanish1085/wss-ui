
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
// import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { GlobalConfiguration } from '../../../config/global.config';
import { User } from '../../../models/user.model';

/**
 * VERY IMPORTANT DO NOT CHANGE ANY CODE IN THIS CLASS !!!!!!
 * Using Angular's old Http API so that Interceptor for login URL Does not gets called.
 * For all other BACKEND API Request we will use Angular's 4.3 HttpClient API for HTTP Requests
 * since HttpClient API has support for Interceptors. If in future Angular's latest version does not
 * have old Http API then replace this class's Http from @angular/http to HttpClient from @angular/common/http
 */
@Injectable()
export class LoginService {

  private readonly SESSION_DURATION_MINUTES : number = 30;

  private readonly SESSION_END_TIME_KEY = "session_horcrux";
  private readonly TOKEN_KEY = "ngb_horcrux";
  private AUTHENTICATION_URL : string;
  private AUTHORIZATION_HEADER_TEXT = "Authorization";
  private jwtHelper: JwtHelperService;

  constructor (private http: HttpClient, private globalConfiguration : GlobalConfiguration) {
    this.AUTHENTICATION_URL = this.globalConfiguration.getAuthenticationURL();
    this.jwtHelper = new JwtHelperService();
  }

    public authenticate(user : User, response : boolean){
  
    /*let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers,user);

    let options = {
      headers : headers
    };*/

    let options = {
    };

    if(response){
      options["observe"] = 'response';
      return this.http.post(this.AUTHENTICATION_URL,user,options).pipe(map((response : HttpResponse<any>) => {
          if(response){
            this.processTokenFromResponse(response.headers);
          }
          return response;
        }));
    }else{
      return this.http.post(this.AUTHENTICATION_URL,user,options);
    }
  }

  private createAuthorizationHeader(headers: HttpHeaders, user : User) : void {
    headers.append('Credentials', 'Basic ' + btoa(user.getUsername() + ':' + user.getPassword()));
  }

  private processTokenFromResponse(httpHeaders : HttpHeaders){
    console.log("processTokenFromResponse called");

    if(!httpHeaders){
      console.error("Invalid input params " + httpHeaders);
      return;
    }

    let fullToken = httpHeaders.get(this.AUTHORIZATION_HEADER_TEXT);
    if (fullToken) {
      //console.log("Full Token");
      //console.log(fullToken);
      let token = fullToken.split(" ")[1];
      //console.log("Token after split");
      //console.log(token);
      sessionStorage.setItem(this.TOKEN_KEY, token);
      let sessionEndTimestamp = new Date(new Date().getTime() + this.SESSION_DURATION_MINUTES * 60 * 1000).getTime();
      sessionStorage.setItem(this.SESSION_END_TIME_KEY, sessionEndTimestamp.toString());
    }
  }
}
