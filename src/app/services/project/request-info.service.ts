import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConfiguration } from 'src/app/config/global.config';
import { RequestInfo } from 'src/app/models/request-info';

@Injectable({
  providedIn: 'root'
})
export class RequestInfoService {

  contextPath: any;

  constructor(private http: HttpClient, private globalConfiguration: GlobalConfiguration) {
    this.contextPath = this.globalConfiguration.getBackendURLPrefix();
  }

  insertRequestInfo(requestInformation: RequestInfo, uploadFiles: File [] ) {
    let formData = new FormData();
        uploadFiles.forEach(file  => {
        formData.append('files', file);
    });

    formData.append('requestInformation', JSON.stringify(requestInformation));

    return this.http.post(this.contextPath + 'request-information', formData, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        return response;
      }));
  }

}
