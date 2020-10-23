import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { IssueMasterService } from 'src/app/services/project/issue-master.service';

@Component({
  selector: 'app-view-issue',
  templateUrl: './view-issue.component.html',
  styleUrls: ['./view-issue.component.css']
})
export class ViewIssueComponent implements OnInit {


  loggedInUser: User;
  username: string;
  locationCode: string;
  assignedProblemStatement:any;
  isView:boolean;
  viewIssue:any;
  files:any;

  constructor(private issueMasterService: IssueMasterService, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {

    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.locationCode = this.loggedInUser.getLocationCode();

    this.getAllAssignedProblemStatement(this.username, this.locationCode);
  }

  getAllAssignedProblemStatement(username: any, locationCode: any) {

    this.issueMasterService.getAllAssignedProblem(username,locationCode).subscribe(success=>{
    
      console.log("Getting Assign problem");

      console.log(success.body);

      this.assignedProblemStatement = success.body;


    },error=>{

    })

  }
  public onClickView(ps :any){

    this.viewIssue = ps;
    this.isView = true;
    this.getFileByTokenNumber(ps.tokenNumber);
    console.log("View Clicked");
    console.log(ps);

  }
  public onClickBack(){
    this.isView = false;

  }

  getFileByTokenNumber(tokenNumber: any) {

    this.issueMasterService.getFileByTokenNumber(tokenNumber).subscribe(success=>{
    
      console.log("Gettinf File");

      console.log(success.body);

      this.files = success.body;


    },error=>{

    })

  }
  

}
