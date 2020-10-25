import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { RequestInformationService } from 'src/app/services/project/request-information.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';

@Component({
  selector: 'app-request-notification',
  templateUrl: './request-notification.component.html',
  styleUrls: ['./request-notification.component.css']
})
export class RequestNotificationComponent implements OnInit {

  loggedInUser: User;
  username: string;
  requestInfo: any[];

  constructor(private authorizationService: AuthorizationService, private requestInformationService: RequestInformationService, private globalUtilityService: GobalutilityService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.getRequestInformationByUsername(this.username);
  }
  getRequestInformationByUsername(username: string) {
    this.requestInformationService.getRequestInformation(username).subscribe(success => {
      console.log(success);
      if(success.body != null) {
        if (success.status === 200) {
          this.requestInfo = success.body;
          console.log("Request Information Recieved Successfully")
        }
        
      }else if(success.status === 204) {
        console.log("No Content Found in request information")
      }

    }, error => {
      console.log("Getting Error while retrive request information")
    })

  }

  oclickNotification() {
    this.getRequestInformationByUsername(this.username)
  }


}
