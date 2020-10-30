
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service'
import { GobalutilityService } from 'src/app/utility/gobalutility.service';
import { RequestInformationService } from 'src/app/services/project/request-information.service'
import { IssueMasterService } from 'src/app/services/project/issue-master.service';
import { GlobalConstants } from 'src/app/utility/global.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInUser: User;
  username: string;
  locationCode: string;
  assignedProblemStatement: any;
  files: any;
  isView: boolean;
  viewIssue: any;
  isDisable: boolean;
  isForward: boolean;
  isRequestInfo: boolean;
  isResolve: boolean;
  isReject: boolean;
  name: string;
  forwardIssue: any;
  requestInfoUser: any;
  requestInfoForm; rejectForm; resolveForm: FormGroup;
  requestForwardForm: FormGroup;
  requestInfoObject: any = {};
  isProcessing: boolean;
  

  constructor(private dashboardService: DashboardService,private issueMasterService:IssueMasterService,
     private authorizationService: AuthorizationService, private requestInformationService: RequestInformationService,
    private globalutilityService: GobalutilityService) { }

  ngOnInit(): void {

    this.requestInfoForm = new FormGroup({
      remark: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required)

    });

    this.requestForwardForm = new FormGroup({
      remark: new FormControl('', Validators.required),

    });

    this.resolveForm = new FormGroup({
      comments: new FormControl('', Validators.required),
    });

    this.rejectForm = new FormGroup({
      comments: new FormControl('', Validators.required),
    });



    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.locationCode = this.loggedInUser.getLocationCode();
    this.name = this.loggedInUser.getName();
    this.getAllAssignedProblemStatement(this.username);
  }

  getAllAssignedProblemStatement(username: any) {

    this.dashboardService.getAllAssignedProblem(username).subscribe(success => {

      console.log("Getting Assign problem");

      console.log(success.body);

      this.assignedProblemStatement = success.body;
 }, error => {

      console.log("Insise error");

    })

  }



  public onClickView(ps: any) {

    console.log("Checking Status");
    console.log(ps.status)

    if (ps.status === 'COMPLETED' || ps.status === 'REJECTED' || ps.status === 'FORWARDED') {
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }


    this.viewIssue = ps;
    this.isView = true;
    this.getFileByTokenNumber(ps.tokenNumber);
    console.log("View Clicked");
    console.log(ps);

  }
  public onClickBack() {
    this.isView = false;
    this.isForward = false;

  }

  onClickResolve(ps: any) {
    this.isForward = false;
    this.isReject = false;
    this.isRequestInfo = false;
    this.isResolve = true;
  }

  onResolveSubmit() {
    this.isProcessing = true;
    this.dashboardService.resolveIssueByTokenNumber(this.viewIssue.tokenNumber, this.resolveForm.value.comments).subscribe(success => {
      if (success.status === 201) {
        this.globalutilityService.successAlertMessage("Issue resolve successfully");
        this.isProcessing = false;
        this.resetResolveForm();
      }
      this.getAllAssignedProblemStatement(this.username);
    }, error => {
      if (error.status === 417) {
        this.resetResolveForm();
        this.globalutilityService.errorAlertMessage("Unable to resolve !!");

      }
    })

  }

  onClickResolveBack() {
    this.isForward = false;
    this.isReject = false;
    this.isRequestInfo = false;
    this.isResolve = false;
  }
  onClickReject(ps: any) {
    this.isForward = false;
    this.isReject = true;
    this.isRequestInfo = false;
    this.isResolve = false;
    console.log("Resolve Issue Clicked");
    console.log(ps);

  }

  onRejectSubmit() {
    this.isProcessing = true;
    this.dashboardService.rejectIssueByTokenNumber(this.viewIssue.tokenNumber, this.rejectForm.value.comments).subscribe(success => {
      if (success.status === 201) {
        this.isProcessing = false;
        this.resetRejectForm();
        this.globalutilityService.successAlertMessage("Issue rejected successfully");
      }
      this.getAllAssignedProblemStatement(this.username);
    }, error => {
      if (error.status === 417) {
        this.isProcessing = false;
        this.resetRejectForm();
        this.globalutilityService.errorAlertMessage("Unable to reject issue !!");
      }
    })

  }


  onClickRejectBack() {
    this.isForward = false;
    this.isReject = false;
    this.isRequestInfo = false;
    this.isResolve = false;

  }

  onClickforward(viewIssue: any) {
    this.isForward = true;
    this.isReject = false;
    this.isRequestInfo = false;
    this.isResolve = false;
    console.log("forward click");
    console.log(viewIssue);
  }

  public onClickForwardBack() {
    this.isForward = false;
    this.isReject = false;
    this.isRequestInfo = false;
    this.isResolve = false;
  }

  onClickRequestInfo(viewIssue: any) {
    this.isForward = false;
    this.isReject = false;
    this.isRequestInfo = true;
    this.isResolve = false;
    console.log("request info click");
    console.log(viewIssue);
    this.dashboardService.getUserByTokenNumber(viewIssue.tokenNumber).subscribe(success => {
      console.log("success");
      console.log(success);
      this.requestInfoUser = success.body;

    }, error => {

      console.log("eroor");
    })
  }


  public onClickRequestInfoBack() {
    this.isRequestInfo = false;
    this.reset();
  }

  onForwardSubmit() {
    this.prepareFarwardIssueObject();
    this.dashboardService.forwardIssueToParent(this.forwardIssue).subscribe(success => {
      if (success.status === 201) {
        this.globalutilityService.successAlertMessage("Issue Forwarded Successfully")
        this.isForward = false;
        this.getAllAssignedProblemStatement(this.username);
        this.resetForwardForm()
      }
    }, error => {
      if (error.status === 417) {
        this.globalutilityService.errorAlertMessage("Unable to forward issue")
        this.isForward = false;
        this.resetForwardForm()
      }
    })

  }
  private prepareFarwardIssueObject() {
    this.forwardIssue = this.viewIssue;
    this.forwardIssue.locationCode = this.locationCode;
    this.forwardIssue.locationName = this.loggedInUser.getLocationName();
    this.forwardIssue.username = this.username;
    this.forwardIssue.name = this.name;
    this.forwardIssue.remark = this.requestForwardForm.value.remark;

  }

  getFileByTokenNumber(tokenNumber: any) {

    this.dashboardService.getFileByTokenNumber(tokenNumber).subscribe(success => {
      console.log(success.body);
      this.files = success.body;
    }, error => {

    })

  }
  onSubmitRequestInfo() {
    this.prepareRequestInfoObject();
    this.requestInformationService.requestInformationToOrigin(this.requestInfoObject).subscribe(success => {
      console.log("Inside success");
      console.log(success);
      if (success.status === 201) {
        this.isRequestInfo = false;
        this.reset();
        this.globalutilityService.successAlertMessage("Request info sent successfully")
      }
    },
      error => {
        if (error.status === 417) {
          this.globalutilityService.errorAlertMessage("Unable to sent request info");
          this.isRequestInfo = false;
        }

      })
  }

  prepareRequestInfoObject() {
    this.requestInfoObject.tokenNumber = this.requestInfoForm.value.user.tokenNumber;
    this.requestInfoObject.username = this.requestInfoForm.value.user.username;
    this.requestInfoObject.name = this.requestInfoForm.value.user.name;
    this.requestInfoObject.requestedUsername = this.username;
    this.requestInfoObject.requestedName = this.name;
    this.requestInfoObject.requestMessage = this.requestInfoForm.value.remark;
  }


  reset() {
    this.requestInfoForm.patchValue({
      remark: '',
      user: ''
    });
  }

  resetForwardForm() {
    this.requestForwardForm.patchValue({
      remark: ''
    });
  }

  resetResolveForm() {
    this.resolveForm.patchValue({
      comments: ''
    });
  }

  resetRejectForm() {
    this.rejectForm.patchValue({
      comments: ''
    });
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

  /**
   * Save blob to file
   * @param blob
   */
  saveFile(success: any, fileName: string) {
    if (success) {
      let blob = GobalutilityService.createBlobFromResponse(success);
      this.globalutilityService.saveFile(blob, fileName);
    }
  }

  /**
   * Handle errors
   * @param error
   */
  handleError(error: any) {
    this.globalutilityService.parseStringFromBlob(error.error);
    this.globalutilityService.errorAlertMessage("Unable to download file.");
  }




}
