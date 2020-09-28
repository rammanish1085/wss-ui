import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GlobalConfiguration } from 'src/app/config/global.config';


@Injectable({
  providedIn: 'root'
})
export class OtpService {

  contextPath: any;
  constructor(private http: HttpClient, private globalConfiguration: GlobalConfiguration) {
    this.contextPath = this.globalConfiguration.getBackendURLPrefix();
  }


  generateOTP() {
    console.log("Inside generate OTP");
    return this.http.get(this.contextPath + '/otp/generateOtp', { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }

  validateOTP(otp:number) {
    console.log("Inside generate OTP");
    return this.http.get(this.contextPath + 'otp/validateOtp/otp/' + otp, { observe: 'response' }).pipe(map(
      (response: HttpResponse<any>) => {
        return response;
      }));
  }


  // public validateOTP(otp: any) {
  //   let httpParams = new HttpParams();
  //   httpParams = httpParams.append("otpnum", "" + otp);
  //    let options = {
  //       params: httpParams
  //   };
  //   if(response){
  //     options['observe'] = "response";
  //   }

  //   return this.http.get(this.contextPath + 'otp/validateOtp', options);
  // }


  // public validateOTP(otpnum:number){
    
  //   let httpParams = new HttpParams();
  //   httpParams = httpParams.append("otpnum","" + otpnum);
  //   let options = { params : httpParams };
  //   options['observe'] = "response";
  //    return this.http.get(this.contextPath + 'otp/validateOtp/', options);
  //  }


}
