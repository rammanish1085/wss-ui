import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Injectable({
  providedIn: 'root'
})
export class GobalutilityService {
  

  constructor() { }

  public alertWithSuccess(message:any){
    Swal.fire(message)
  }
  
  errorAlertMessage( message:string){
    return swal({
        html: message,
        animation: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true,
        focusConfirm: true,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-danger',
        // confirmButtonColor: "#d9534f",
        confirmButtonText: 'OK',
    });
}

successAlertMessage(message:string){
    return swal({
        html: message,
        animation: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true,
        focusConfirm: true,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success',
        // confirmButtonColor: "#5cb85c",
        confirmButtonText: 'OK',
    });
}

confirmAlertMessage(message:string){
    return swal({
        html: message,
        animation: true,
        showCancelButton: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        allowEnterKey: true,
        focusConfirm: true,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success mx-sm-3',
        cancelButtonClass: 'btn btn-danger',
        // confirmButtonColor: "#5cb85c",
        // cancelButtonColor: '#d33',
        confirmButtonText: 'YES ',
        cancelButtonText: 'NO ',
    });
  }


}
