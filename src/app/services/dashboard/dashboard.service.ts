import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConfiguration } from 'src/app/config/global.config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  contextPath: any;
  constructor(private http: HttpClient, private globalConfiguration: GlobalConfiguration) {
    this.contextPath = this.globalConfiguration.getBackendURLPrefix();
  }

  getAllAssignedProblem(username: string) {
    console.log("Inside getting users");
    return this.http.get(this.contextPath + '/project-problem-assignment/user-name/' + username, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }

  getFileByTokenNumber(tokenNumber: string) {
    console.log("Inside getting users");
    return this.http.get(this.contextPath + '/file/token-number/' + tokenNumber, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }

  resolveIssueByTokenNumber(tokenNumber: string,comments:string) {

    let formData = new FormData();
    formData.append('tokenNumber',tokenNumber);
    formData.append('comments',comments);
    return this.http.post(this.contextPath + 'project-problem-assignment/accept', formData, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }));
    }

  rejectIssueByTokenNumber(tokenNumber: string,comments:string) {
    let formData = new FormData();
    formData.append('tokenNumber',tokenNumber);
    formData.append('comments',comments);
    return this.http.post(this.contextPath + 'project-problem-assignment/reject', formData, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }));
 }
 
 forwardIssueToParent(forwardIssue: any) {

  return this.http.post(this.contextPath + 'project-problem-assignment', forwardIssue, { observe: 'response' }).pipe(
    map((response: HttpResponse<any>) => {
      return response;
    }))
}

getUserByTokenNumber(tokenNumber: any) {
  console.log("Inside getting users");
  return this.http.get(this.contextPath + '/project-problem-assignment/user/token-number/' + tokenNumber, { observe: 'response' }).pipe(map(
    (response: HttpResponse<any>) => {
      return response;
    }));
}

}
