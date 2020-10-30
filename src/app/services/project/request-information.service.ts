import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConfiguration } from 'src/app/config/global.config';

@Injectable({
  providedIn: 'root'
})
export class RequestInformationService {

  contextPath: any;
  constructor(private http: HttpClient, private globalConfiguration: GlobalConfiguration) {
    this.contextPath = this.globalConfiguration.getBackendURLPrefix();
  }

  requestInformationToOrigin(requestInformation: any) {

    return this.http.post(this.contextPath + 'request-information', requestInformation, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }))
  }

  getRequestInformation(username: string) {
    return this.http.get(this.contextPath + 'request-information/user-name/' + username, { observe: 'response' }).pipe(map(
     (response: HttpResponse<any>) => {
       return response;
     }));
 }

 getByRequestUsername(requestedUsername: string) {
  console.log("Inside getting users");
  return this.http.get(this.contextPath + '/request-information/requested-username/' + requestedUsername, { observe: 'response' }).pipe(map(
    (response: HttpResponse<any>) => {
      return response;
    }));
}

}
