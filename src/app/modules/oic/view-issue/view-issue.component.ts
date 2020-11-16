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
  assignedProblemStatement: Array<any>;
  isView: boolean;
  viewIssue: any;
  files: any;
  total_issues: number;
  page: number = 1;
  tokenNumber: any;
  isTrue: boolean;
  statusList: any;

  constructor(private issueMasterService: IssueMasterService, private issueStatusService: IssueStatusService,
    private globalUtilityService: GobalutilityService, private authorizationService: AuthorizationService, private route: ActivatedRoute, private router: Router) {
    this.assignedProblemStatement = new Array<any>()

  }

  ngOnInit(): void {
    this.assignedProblemStatement = [];
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.locationCode = this.loggedInUser.getLocationCode();
    this.getAllAssignedProblemStatement(this.username, this.locationCode);
  }

  getAllAssignedProblemStatement(username: any, locationCode: any) {
    this.issueMasterService.getAllAssignedProblem(username, locationCode).subscribe(success => {
      console.log("Getting Assign problem");
      console.log(success.body);
      this.assignedProblemStatement = success.body;
      // this.total_issues = this.assignedProblemStatement.length;
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
    console.log("View Clicked");
    console.log(ps);

  }
  getIssueStatusByTokenNumber(tokenNumber: any) {
    this.issueStatusService.getRequestInformation(tokenNumber).subscribe(success => {

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

      console.log("Gettinf File");

      console.log(success.body);

      this.files = success.body;


    }, error => {
      console.log("Getting Error");
      console.log(error);
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



  search() {
    if (this.tokenNumber == "") { this.ngOnInit(); }
    else {
      this.assignedProblemStatement = this.assignedProblemStatement.filter(res => {
        return res.tokenNumber.toLocaleLowerCase().match(this.tokenNumber.toLocaleLowerCase())
      })
    }
  }


}
