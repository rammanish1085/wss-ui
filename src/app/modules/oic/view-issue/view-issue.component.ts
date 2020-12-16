import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { IssueMasterService } from 'src/app/services/project/issue-master.service';
import { IssueStatusService } from 'src/app/services/project/issue-status.service';
import { GlobalConstants } from 'src/app/utility/global.constants';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';
import { DatePipe } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-issue',
  templateUrl: './view-issue.component.html',
  styleUrls: ['./view-issue.component.css']
})
export class ViewIssueComponent implements OnInit {

  config: any;
  collection = [];
  loggedInUser: User;
  username: string;
  locationCode: string;
  assignedProblemStatement:any =[];
  isView: boolean;
  viewIssue: any;
  files: any;
  total_issues: number;
  page: number = 1;
  tokenNumber: any;
  isTrue: boolean;
  statusList: any;
  dtOptions: any = {};
  resolveIssuefiles: any;
  isResolveIssueFile :boolean;
  uploadReopenIssueFiles: any;
  reopenIssueForm :FormGroup;
  isReopen : boolean;
  reopenIssue:any;
  isReopenIssueFile :boolean;
  reopenIssuefiles: any;

  constructor(private issueMasterService: IssueMasterService,public datepipe: DatePipe, private issueStatusService: IssueStatusService,
    private globalUtilityService: GobalutilityService,private globalutilityService: GobalutilityService, private authorizationService: AuthorizationService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {

    this.reopenIssueForm = new FormGroup({
      reopenMessage: new FormControl('', Validators.required),
      isAttachment :new FormControl(false),
    });

    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.locationCode = this.loggedInUser.getLocationCode();
    this.getAllAssignedProblemStatement(this.username, this.locationCode);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    lengthMenu : [10, 25, 50],
      processing: true
    };

  }

  onClickReopen(ps:any){
   console.log("reopn issue clicked");
   this.reopenIssue = ps;

   var diffDays:any= this.calculateDiff(this.datepipe.transform(ps.updatedOn, 'medium'));
   if(diffDays>7){
    this.globalutilityService.errorAlertMessage("7 days is overed issue can't' be reopen");
   }else{
    this.isReopen = true;
  
   }
  }

  onReopenSubmit(){
    console.log("onReopenSubmit");
    console.log(this.reopenIssueForm.value);
    console.log(this.reopenIssue.tokenNumber);
    console.log(this.reopenIssue.status);
    
    this.issueMasterService.reopenIssueByTokenNumber(this.reopenIssue.tokenNumber,this.reopenIssue.status,this.reopenIssueForm.value.reopenMessage,this.uploadReopenIssueFiles).subscribe(success=>{
      this.globalutilityService.successAlertMessage("Issue reopen successfully");
      this.getAllAssignedProblemStatement(this.username, this.locationCode);
      this.resetReopenForm();

    },error=>{
      this.globalutilityService.errorAlertMessage("Unable to reopen issue !!!");
      this.resetReopenForm();

    })
  }

  calculateDiff(sentDate) {
    var date1:any = new Date(sentDate);
    var date2:any = new Date();
    console.log(this.datepipe.transform(date2, 'medium'));
    var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  getAllAssignedProblemStatement(username: any, locationCode: any) {
    this.issueMasterService.getAllAssignedProblem(username, locationCode).subscribe(success => {
      console.log("Inside Success Assign problem found");
      console.log(success);
      if(success.status === 200){
        this.assignedProblemStatement = success.body;
      }else if(success.status === 204){
        console.log("No content found");
        this.assignedProblemStatement =[];
      }
            
    }, error => {
      console.log("Getting Error while getting assigned problem");
      console.log(error);
    })

  }

  public onClickView(ps: any) {

    this.viewIssue = ps;
    this.isView = true;
    this.getFileByTokenNumber(ps.tokenNumber);
    this.getIssueStatusByTokenNumber(ps.tokenNumber);
    this.viewResolveIssueFileClicked(ps);
    this.viewReopenFileClicked(ps);
    
  }

  getIssueStatusByTokenNumber(tokenNumber: any) {
    this.issueStatusService.getRequestInformationByTokenNumber(tokenNumber).subscribe(success => {

      if (success.status === 200) {
        console.log("Getting Current Status of problem by token number");
        this.statusList = success.body;
        console.log(this.statusList);
       }if (success.status === 204) {
        console.log(success);
      }


    }, error => {
      console.log(error);
    })
  }

  public onClickBack() {
    this.isView = false;

  }

  getFileByTokenNumber(tokenNumber: any) {

    this.issueMasterService.getFileByTokenNumber(tokenNumber).subscribe(success => {

      console.log("Getting File");

      console.log(success.body);

      this.files = success.body;

    }, error => {
      console.log("Getting Error");
      console.log(error);
    })

  }

  viewResolveIssueFileClicked(file:any){
    this.isResolveIssueFile = true;
    this.issueMasterService.getResolveIssueFileByTokenNumber(file.tokenNumber).subscribe(success => {
    if(success.status === 200){      
      console.log("Resolve Issue File Found Successfully By TokenNumber");
      this.resolveIssuefiles = success.body;
      console.log(this.resolveIssuefiles);      
    }else if(success.status === 204){
      console.log("No File Found While Getting  File By TokenNumber");
    } 
    }, error => {
      console.log("Getting Error while getting File By TokenNumber");
      console.log(error);
    })
  }

  viewReopenFileClicked(file:any){
    this.isReopenIssueFile = true;
    console.log("reopen file clicked");
    console.log(file);
    this.issueMasterService.getReopenIssueFileByTokenNumber(file.tokenNumber).subscribe(success => {
      if(success.status === 200){      
        console.log("Resolve Issue File Found Successfully By TokenNumber");
        this.reopenIssuefiles = success.body;
        console.log(this.resolveIssuefiles);      
      }else if(success.status === 204){
        console.log("No File Found While Getting  File By TokenNumber");
      } 
      }, error => {
        console.log("Getting Error while getting File By TokenNumber");
        console.log(error);
      })
    }

  onClickDownloadReopenIssueFile(file:any)
  {
    console.log("onClickViewResolveIssueFile");
    this.issueMasterService.downloadReopenIssueFileByTokenNumberAndFileName(file.tokenNumber, file.name, GlobalConstants.FALSE).subscribe(success => {
      this.saveFile(success, file.originalName)
    }, error => {
      this.handleError(error);
    })
  }

  onClickViewResolveIssueFile(file:any){
    console.log("onClickViewResolveIssueFile");
    this.issueMasterService.downloadFileByTokenNumberAndFileName(file.tokenNumber, file.name, GlobalConstants.FALSE).subscribe(success => {
      this.saveFile(success, file.originalName)
    }, error => {
      this.handleError(error);
    })
  }

  viewFileClicked(file: any) {
    console.log("file view Clicked");
    console.log(file);
    this.issueMasterService.viewFile(file.tokenNumber, file.name, GlobalConstants.FALSE).subscribe(success => {
      this.saveFile(success, file.originalName)
    }, error => {
      this.handleError(error);
    })
  }

  onFileChange(event){

    this.uploadReopenIssueFiles = [];

    const size = event.srcElement.files[0].size;

    console.log(size)

    if (size < 1000000) 
    { 
     if(event.target.files.length <=2){
           
      for (var i = 0; i < event.target.files.length; i++) {
        this.uploadReopenIssueFiles.push(event.target.files[i]);
      }
    } else{
        this.globalutilityService.errorAlertMessage("Maximum 2 File Allow to upload");
      }

    }else{
    this.globalutilityService.errorAlertMessage("File Size greater 1 Mb");
    }
  }

  
  isAttachmentClicked(){
    this.reopenIssueForm.get('isAttachment').valueChanges.subscribe(checked => {
      if (checked) {
        const validators = [Validators.required];
        this.reopenIssueForm.addControl('attachment', new FormControl('', validators));
      } else {
        this.reopenIssueForm.removeControl('attachment');
      }

    });
  }

  deleteFieldValue(index) {
    if (this.uploadReopenIssueFiles.length <= 1) {
      this.uploadReopenIssueFiles.splice(index, 1);
      this.resetFile();
    } else {
      this.uploadReopenIssueFiles.splice(index, 1);
    }
  }

  resetFile() {
    this.reopenIssueForm.patchValue({
      attachment: '',
    });
  }
  
  resetReopenForm() {
    this.uploadReopenIssueFiles = [];
    this.reopenIssueForm.patchValue({
      attachment: '',
      reopenMessage:'',
      isAttachment:''
    });
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


}
