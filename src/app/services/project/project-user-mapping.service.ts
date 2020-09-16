import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConfiguration } from 'src/app/config/global.config';

@Injectable({
  providedIn: 'root'
})
export class ProjectUserMappingService {

  contextPath: any;
  constructor(private http: HttpClient, private globalConfiguration: GlobalConfiguration) {
    this.contextPath = this.globalConfiguration.getBackendURLPrefix();
  }


  insertProjectUserMapping(projectUserMapping: any) {

    return this.http.post(this.contextPath + 'project-user-mapping', projectUserMapping, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }))
  }

  getAllProject() {
    console.log("Inside Location Code and Name Service");
    return this.http.get(this.contextPath + '/users', { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }

  getAssignedProjectList(locationCode: string) {
    console.log("Inside getAllAssignedProject");
    return this.http.get(this.contextPath + '/project-user-mapping/location-code/' + locationCode, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }

  getAssignedProjectByUsernameAndLocationCode(username: any, locationCode: any) {
    console.log("getAssignedProjectByUsernameAndLocationCode");
    return this.http.get(this.contextPath + '/project-user-mapping/username/'+ username + '/location-code/' + locationCode, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }
}