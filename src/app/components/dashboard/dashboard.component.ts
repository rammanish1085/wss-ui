
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
  username: any;
  totalIssue:number =0;
  pendingIssue:number =0;
  forwardedIssue:number =0;
  resolveIssue:number =0;
  constructor(private authorizationService: AuthorizationService,private dashboardService:DashboardService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.countByUsername(this.username);
    this.countByUsernameAndStatusPending(this.username,'PENDING');
     this.countByUsernameAndStatusResolve(this.username,'COMPLETED');
     this.countByUsernameAndStatusForwarded(this.username,'FORWARDED');
    
  }
  countByUsernameAndStatusForwarded(username: any, status: string) {
    this.dashboardService.countByUsernameAndStatus(username,status).subscribe(success=>{
      console.log("inside success");
      console.log(success);
      this.forwardedIssue = success.body;
    },error=>{})
  }
  countByUsernameAndStatusResolve(username: any, status: string) {
    this.dashboardService.countByUsernameAndStatus(username,status).subscribe(success=>{
      console.log("inside success");
      console.log(success);
      this.resolveIssue = success.body;
    },error=>{})
  }
  countByUsernameAndStatusPending(username: any, status: string) {
    this.dashboardService.countByUsernameAndStatus(username,status).subscribe(success=>{
      console.log("inside success");
      console.log(success);
      this.pendingIssue = success.body;
    },error=>{})
  }
  countByUsername(username: any) {
    this.dashboardService.countByUsername(username).subscribe(success => {
      console.log("success");
      console.log(success);
      this.totalIssue = success.body;
     
    }, error => {

      console.log("eroor");
    })
  }
 
}
