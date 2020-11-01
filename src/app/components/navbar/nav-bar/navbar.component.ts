import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedInUser: User;
  
  constructor(private authorizationService: AuthorizationService,private router: Router) {
  }

  ngOnInit() {
    console.log("Initialising Navbar");
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    console.log(this.loggedInUser);
  }

  logoutClicked() {
    console.log("logout clicked from ngb-navbar");
    localStorage.clear();
    this.authorizationService.logout();
  }

  settingClicked() {
    console.log("setting clicked from ngb-navbar");
    this.router.navigate(['setting'],{ queryParams: { source: this.router.url }, queryParamsHandling: "merge" });
  }

}
