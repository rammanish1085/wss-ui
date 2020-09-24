import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Injectable({
  providedIn: 'root'
})
export class GobalutilityService {
  

  constructor() { }

  public alertWithSuccess(message:any){
    Swal.fire(message)
  }
  
  public alertWithWarning(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  public alertWithSuccess2(message:any,tokenId:any){
    Swal.fire(message +"    " + tokenId)
  }


}
