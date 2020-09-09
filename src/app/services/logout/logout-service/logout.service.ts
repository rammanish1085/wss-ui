
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
//import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { GlobalConfiguration } from '../../../config/global.config';

@Injectable()
export class LogoutService{
    //Context path for redirection to Backend resources
    // The URL in this variable ends with a front slash. !!!!!!!!! Don't append in your respective methods !!!!!!!!!!!
    private contextPath : string;
    private logoutControllerUrl : string;
    constructor(private http: HttpClient,private globalConfiguration : GlobalConfiguration){
        this.contextPath = this.globalConfiguration.getBackendURLPrefix();
        this.logoutControllerUrl = this.globalConfiguration.getLogoutURLPrefix();
    }

    public logoutSession(sessionId : number,token : string){
        console.log("logoutSession called for sessionId " + sessionId);
        let headers = new HttpHeaders();
        //this.createAuthorizationTokenHeader(headers,token);
        return this.http.put(this.contextPath + this.logoutControllerUrl + '/' + 'session/id/' + sessionId,{},{
          headers: headers
        }).pipe(map((response : HttpResponse<any>) => {
          return response;
        }))
    }

    public createAuthorizationTokenHeader(headers: HttpHeaders,token : string) : void {
        headers.append('Authorization', 'Bearer ' + token);
    }
}
