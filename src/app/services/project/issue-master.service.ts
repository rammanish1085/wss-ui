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


  insertIssueMaster1(issueMaster: any,uploadFile:File) {

    return this.http.post(this.contextPath + '/issue-master', issueMaster, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }))
  }

  insertIssueMaster2(issueMaster:any,myFiles:File []) {
  
    const formData = new FormData();
    formData.append('issueMaster',JSON.stringify(issueMaster));
    formData.append('files',JSON.stringify(myFiles));
    
    return this.http.post(this.contextPath +'issue-master',formData);
  }

  insertIssueMaster(issueMaster:IssueMaster,myFiles:File []) {
    
   
   
   // let httpParams = new HttpParams();
    const formData = new FormData();
    
    formData.append('files',JSON.stringify(myFiles));

    formData.append('issueMaster',JSON.stringify(issueMaster));
   

    console.log(issueMaster);

    console.log(myFiles)

    console.log(formData);
    
    return this.http.post(this.contextPath +'issue-master',formData);
  }

}




