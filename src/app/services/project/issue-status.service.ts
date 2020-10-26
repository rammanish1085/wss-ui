import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConfiguration } from 'src/app/config/global.config';

@Injectable({
  providedIn: 'root'
})
export class IssueStatusService {

  contextPath: any;
  constructor(private http: HttpClient, private globalConfiguration: GlobalConfiguration) {
    this.contextPath = this.globalConfiguration.getBackendURLPrefix();
  }
 

  getRequestInformation(tokenNumber: string) {
    return this.http.get(this.contextPath + 'issue-status/token-number/' + tokenNumber, { observe: 'response' }).pipe(map(
     (response: HttpResponse<any>) => {
       return response;
     }));
 }

}
