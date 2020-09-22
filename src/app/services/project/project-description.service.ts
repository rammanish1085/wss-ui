import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConfiguration } from 'src/app/config/global.config';

@Injectable({
  providedIn: 'root'
})
export class ProjectDescriptionService {

  contextPath: any;
  constructor(private http: HttpClient, private globalConfiguration: GlobalConfiguration) {
    this.contextPath = this.globalConfiguration.getBackendURLPrefix();
  }


  getProjectModuleByProjectName(projectName: string) {
    console.log("Inside getProjectModuleByProjectName");
    return this.http.get(this.contextPath + '/project-description/project-name/' + projectName, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }



}
