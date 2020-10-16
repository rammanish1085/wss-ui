import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConfiguration } from 'src/app/config/global.config';
import { IssueMaster } from 'src/app/models/issueMaster.model';

@Injectable({
  providedIn: 'root'
})
export class IssueMasterService {

  contextPath: any;

  constructor(private http: HttpClient, private globalConfiguration: GlobalConfiguration) {
    this.contextPath = this.globalConfiguration.getBackendURLPrefix();
  }


  // insertIssueMaster1(issueMaster: any, uploadFile: File) {

  //   return this.http.post(this.contextPath + '/issue-master', issueMaster, { observe: 'response' }).pipe(
  //     map((response: HttpResponse<any>) => {
  //       return response;
  //     }));
  // }



  // tslint:disable-next-line: typedef
  insertIssueMaster(issueMaster: IssueMaster, myFiles: File []) {

    console.log('Getting Upload File');

    console.log(myFiles);

    const formData = new FormData();

    // tslint:disable-next-line: prefer-for-of
    // for (let i = 0; i < myFiles.length; i++) {
    //   formData.append('files[]', myFiles[i]);
    // }

    formData.append('files', JSON.stringify(myFiles));


   // formData.append('files',JSON.stringify(files));


    formData.append('issueMaster', JSON.stringify(issueMaster));

    console.log('Getting Form Data');

    console.log(formData);

    console.log(formData.get('issueMaster'));

    return this.http.post(this.contextPath + 'issue-master', formData, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }));
  }

}




