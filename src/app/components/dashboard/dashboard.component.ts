
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInUser: User;
  username: string;
  locationCode: string;
  assignedProblemStatement:any;
  files:any;
  isView:boolean;
  viewIssue:any;

  constructor(private dashboardService: DashboardService, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {

    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
     this.getAllAssignedProblemStatement(this.username);
  }

  getAllAssignedProblemStatement(username: any) {

    this.dashboardService.getAllAssignedProblem(username).subscribe(success=>{
    
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

  onClickResolve(ps:any){
    console.log("Resolve Issue Clicked");
    console.log(ps);
    this.resolveIssue(ps.tokenNumber);

  }
  resolveIssue(tokenNumber: any) {
    this.dashboardService.resolveIssueByTokenNumber(tokenNumber).subscribe(success=>{
      console.log("inside Success")
      console.log(success.body)
      this.getAllAssignedProblemStatement(this.username);
      // this.onClickView(this.assignedProblemStatement);
    },error=>{})
  }

  onClickReject(ps:any){
    console.log("Resolve Issue Clicked");
    console.log(ps);
    this.rejectIssue(ps.tokenNumber);

  }
  rejectIssue(tokenNumber: any) {
    this.dashboardService.rejectIssueByTokenNumber(tokenNumber).subscribe(success=>{
      console.log("inside Success")
      console.log(success.body)
      this.getAllAssignedProblemStatement(this.username);
      // this.onClickView(this.assignedProblemStatement);
    },error=>{})
  }



  getFileByTokenNumber(tokenNumber: any) {

    this.dashboardService.getFileByTokenNumber(tokenNumber).subscribe(success=>{
    
      console.log("Gettinf File");

      console.log(success.body);

      this.files = success.body;


    },error=>{

    })

  }

}
