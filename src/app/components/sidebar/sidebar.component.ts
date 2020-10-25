import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { RequestInformationService } from 'src/app/services/project/request-information.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService,private requestInformationService:RequestInformationService) { }

  username :string;

  role:any;

  loggedInUser: User;

  requestInfo:any [];

  notification:number;

  ngOnInit() {
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.role = this.loggedInUser.getRole();
    this.username = this.loggedInUser.getUsername();
    this.getRequestInformationByUsername(this.username)
  }

  getRequestInformationByUsername(username: string) {
    this.requestInformationService.getRequestInformation(username).subscribe(success => {
      this.requestInfo = success.body;
      if(this.requestInfo !== null)
       {this.notification =this.requestInfo.length}
    }, error => { })
  }

  oclickNotification(){
    this.getRequestInformationByUsername(this.username)
  }

}
