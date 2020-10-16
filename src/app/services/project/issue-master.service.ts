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

  insertIssueMaster(issueMaster: IssueMaster, myFiles: File [] ) {
    let formData = new FormData();
        myFiles.forEach(file  => {
        formData.append('files', file);
    });

    formData.append('issueMaster', JSON.stringify(issueMaster));

    return this.http.post(this.contextPath + 'issue-master', formData, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }));
  }

}




