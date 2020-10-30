import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { RequestInformationService } from 'src/app/services/project/request-information.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';
import {RequestInfo} from 'src/app/models/request-info'
import {RequestInfoService} from 'src/app/services/project/request-info.service'
import { GlobalConstants } from 'src/app/utility/global.constants';

@Component({
  selector: 'app-request-notification',
  templateUrl: './request-notification.component.html',
  styleUrls: ['./request-notification.component.css']
})
export class RequestNotificationComponent implements OnInit {

  loggedInUser: User;
  username: string;
  isReply : boolean;
  requestInfo: any[];
  replyForm :FormGroup;
  viewRequest:any;
  file: File;
  uploadFiles: File[] = [];
  requestModel :RequestInfo;
  requestInfoList:any;
  isRequestedUser:boolean;
  isRequestInformation :boolean;
  viewResponse: any;
  isViewResponse:boolean;
  requestInformationFile: any;

  constructor(private authorizationService: AuthorizationService,private requestInfoService:RequestInfoService,private globalutilityService : GobalutilityService, private requestInformationService: RequestInformationService, private globalUtilityService: GobalutilityService) { }

  ngOnInit(): void {

    this.replyForm = new FormGroup({
      replyMessage: new FormControl('', Validators.required),
      isAttachment :new FormControl(false),
    });

    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.getRequestInformationByUsername(this.username);
    this.getByRequestedUsername(this.username);
  }
  getRequestInformationByUsername(username: string) {
    this.requestInformationService.getRequestInformation(username).subscribe(success => {
      console.log(success);
      if(success.body != null) {
        if (success.status === 200) {
          this.requestInfo = success.body;
          console.log("Request Information Recieved Successfully")
        }
        
      }else if(success.status === 204) {
         console.log("No Content Found in request information")
         this.isRequestInformation = true;
        
      }

    }, error => {
      console.log("Getting Error while retrive request information")
    })

  }

  getByRequestedUsername(username: any) {

    this.requestInformationService.getByRequestUsername(username).subscribe(success => {

      console.log("Inside Success request inforamtion");

      console.log(success.body);

      this.requestInfoList = success.body;
      if(this.requestInfoList == null){
        this.isRequestedUser = true;
      }

    }, error => {

      console.log("Insise error");
    })

  }

  onClickViewResponse(info:any){
    console.log("view Response clixked");
    console.log(info);
    this.viewResponse =info;
    this.isRequestedUser =true;
    this.isViewResponse = true;
    this.getFileByTokenNumber(info.tokenNumber);
    }

  getFileByTokenNumber(tokenNumber: any) {
    this.requestInformationService.getFileByTokenNumber(tokenNumber).subscribe(success=>{
     console.log("Inside Succes");
     this.requestInformationFile = success.body; 

    },error=>{
      console.log("Inside Succes");

    })
  }
    onClickViewResponseBack(){
      this.isRequestedUser =false;
    this.isViewResponse = false;
    }

  oclickNotification() {
    // this.getRequestInformationByUsername(this.username)
  }
  
  onClickReply(info:any){
    this.isReply= true;
    // this.isRequestInformation = true;
    this.viewRequest = info;
    console.log("reply clicked");
    console.log(info);
    
  }

  onClickReplyBack(){
    this.isReply = false;
  }

  onReplyubmit(){
  
    console.log("on click reply");
    console.log(this.viewRequest);
    this.preparedRequestObject();
    console.log("After Object PRepared");
    console.log(this.requestModel);
    this.requestInfoService.insertRequestInfo(this.requestModel, this.uploadFiles).subscribe(success => {
      if (success.status === 201) {
         this.resetReplyForm();
         this.globalutilityService.successAlertMessage("Reply submited Successfully");
      }
    }, error => {
      if(error.status ===417){
        this.globalutilityService.errorAlertMessage("Unable to submit reply");
        this.resetReplyForm();
      }
     })
    
  
  }

  preparedRequestObject(){

    this.requestModel = new RequestInfo();
    this.requestModel.setTokenNumber(this.viewRequest.tokenNumber);
    this.requestModel.setUsername(this.viewRequest.username);
    this.requestModel.setName(this.viewRequest.name);
    this.requestModel.setRequestedUsername(this.viewRequest.requestedUsername);
    this.requestModel.setRequestedName(this.viewRequest.requestedName);
    this.requestModel.setRequestMessage(this.viewRequest.requestMessage);
    this.requestModel.setResponseMessage(this.replyForm.value.replyMessage);


  }

  onFileChange(event){

    this.uploadFiles = [];

    const size = event.srcElement.files[0].size;

    console.log(size)

    if (size < 1000000) 
    { 
     if(event.target.files.length <=2){
           
      for (var i = 0; i < event.target.files.length; i++) {
        this.uploadFiles.push(event.target.files[i]);
      }
    } else{
        this.globalutilityService.errorAlertMessage("Maximum 2 File Allow to upload");
      }

    }else{
    this.globalutilityService.errorAlertMessage("File Size greater 1 Mb");
    }
  }

  isAttachmentClicked(){
    this.replyForm.get('isAttachment').valueChanges.subscribe(checked => {
      if (checked) {
        const validators = [Validators.required];
        this.replyForm.addControl('attachment', new FormControl('', validators));
      } else {
        this.replyForm.removeControl('attachment');
      }

    });

  }

  deleteFieldValue(index) {
    if (this.uploadFiles.length <= 1) {
      this.uploadFiles.splice(index, 1);
      this.resetFile();
    } else {
      this.uploadFiles.splice(index, 1);
    }
  }

  onClickViewFile(file:any){
    console.log("file view Clicked");
    console.log(file);
    this.requestInformationService.viewFile(file.tokenNumber, file.name, GlobalConstants.FALSE).subscribe(success => {
      this.saveFile(success, file.originalName)
    }, error => {
      this.handleError(error);
    })
  }


  /**
   * Save blob to file
   * @param blob
   */
  saveFile(success: any, fileName: string) {
    if (success) {
      // this.exportType ="pdf"
      let blob = GobalutilityService.createBlobFromResponse(success);
      this.globalUtilityService.saveFile(blob, fileName);
      // this.reset();
    }
  }

  /**
   * Handle errors
   * @param error
   */
  handleError(error: any) {
    this.globalUtilityService.parseStringFromBlob(error.error);
    // this.reset();
    this.globalUtilityService.errorAlertMessage("Unable to download file.");
  }


  
  resetFile() {
    this.replyForm.patchValue({
      attachment: '',
    });

  }
  resetReplyForm() {
    this.uploadFiles = [];
    this.replyForm.patchValue({
      attachment: '',
      replyMessage:'',
      isAttachment:''
    });

  }


  

}
