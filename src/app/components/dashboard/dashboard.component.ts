
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

  constructor(private dashboardService: DashboardService, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {

    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.locationCode = this.loggedInUser.getLocationCode();

    this.getAllAssignedProblemStatement(this.username, this.locationCode);
  }

  getAllAssignedProblemStatement(username: any, locationCode: any) {

    this.dashboardService.getAllAssignedProblem("34420125",locationCode).subscribe(success=>{
    
      console.log("Getting Assign problem");

      console.log(success.body);

      this.assignedProblemStatement = success.body;


    },error=>{

    })

  }

}
