import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';

@Component({
  selector: 'app-oic',
  templateUrl: './oic.component.html',
  styleUrls: ['./oic.component.css']
})
export class OicComponent implements OnInit {

  public loggedInUser: User;

  isTrue: boolean;

  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authorizationService.getLoggedInUser();
  }

  logoutClicked() {
    console.log("logout clicked from ngb-navbar");
    localStorage.clear();
    this.authorizationService.logout();
  }
 
sendMessage() {
  console.log("Message send");
  
    this.messageEvent.emit(this.isTrue)
  }
 
}
