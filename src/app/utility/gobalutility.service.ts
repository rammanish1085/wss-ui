import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { saveAs } from "file-saver";
import {GlobalConstants} from 'src/app/utility/global.constants'

@Injectable({
  providedIn: 'root'
})
export class GobalutilityService {
  

  constructor(private globalConstants: GlobalConstants) { }

   
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
  

  public static createBlobFromResponse(response : any) : Blob{
    return new Blob([response]);
}

parseStringFromBlob(blob) {
  let reader : any = new FileReader();
  reader.readAsText(blob);
  reader.onload = ()=> {
      console.log(reader.result.toString());
  }
}

saveFile(blob: Blob, fileName: string) {
       saveAs(blob, fileName);
      this.successAlertMessage("File download successfully");
 }

saveFileWithoutPrompt(blob: Blob, fileFormat: string, fileName: string) {
  if (GlobalConstants.FILE_FORMAT_PDF === fileFormat) {
      saveAs(blob, fileName + '.pdf');
  } else if (GlobalConstants.FILE_FORMAT_XLSX === fileFormat) {
      saveAs(blob, fileName + '.xlsx');
  } else if (GlobalConstants.FILE_FORMAT_XLS === fileFormat) {
      saveAs(blob, fileName + '.xls');
  }  else if (GlobalConstants.FILE_FORMAT_TEXT === fileFormat) {
      saveAs(blob, fileName + '.txt');
  } else if (GlobalConstants.FILE_FORMAT_HTML === fileFormat) {
      var reader = new FileReader();
      reader.onload = function () {
          var htmlWindow = window.open("", "_blank", "");
          htmlWindow.document.write(reader.result.toString());
      }
      reader.readAsText(blob);
  } else {
      saveAs(blob, fileName);
  }
}

}
