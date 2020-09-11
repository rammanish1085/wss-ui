import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService) { }

  loggedInUser: User;

  ngOnInit() {
    // this.loggedInUser = this.authorizationService.getLoggedInUser();
    // console.log(this.loggedInUser);
  }
  
}
