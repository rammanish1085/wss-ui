import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConfiguration } from 'src/app/config/global.config';

@Injectable({
  providedIn: 'root'
})
export class ProjectProblemStatementService {

  contextPath: any;
  constructor(private http: HttpClient, private globalConfiguration: GlobalConfiguration) {
    this.contextPath = this.globalConfiguration.getBackendURLPrefix();
  }


  getProjectProblemStatementByModule(id:any) {
    console.log("Inside getProjectProblemStatementByModule");
    return this.http.get(this.contextPath + '/project-problem-statement/id/' + id, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }


}
