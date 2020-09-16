import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService) { }


  role:any;
  loggedInUser: User;
  ngOnInit() {
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.role = this.loggedInUser.getRole();
    console.log(this.loggedInUser);
    
  }
  

}
