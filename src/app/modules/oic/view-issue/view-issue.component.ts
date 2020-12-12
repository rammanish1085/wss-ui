import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { IssueMasterService } from 'src/app/services/project/issue-master.service';
import { IssueStatusService } from 'src/app/services/project/issue-status.service';
import { GlobalConstants } from 'src/app/utility/global.constants';
import { GobalutilityService } from 'src/app/utility/gobalutility.service'

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

  constructor(private issueMasterService: IssueMasterService, private issueStatusService: IssueStatusService,
    private globalUtilityService: GobalutilityService, private authorizationService: AuthorizationService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.locationCode = this.loggedInUser.getLocationCode();
    this.getAllAssignedProblemStatement(this.username, this.locationCode);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    lengthMenu : [5, 10, 25],
      processing: true
    };

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
    
  }
  getIssueStatusByTokenNumber(tokenNumber: any) {
    this.issueStatusService.getRequestInformationByTokenNumber(tokenNumber).subscribe(success => {

      if (success.status === 200) {
        this.statusList = success.body;
        console.log("issue status");
        console.log(this.statusList);
      } if (success.status === 204) {
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
