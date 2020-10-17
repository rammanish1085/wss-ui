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
}
