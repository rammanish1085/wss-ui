import { Component,OnInit} from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';

@Component({
  selector: 'app-oic',
  templateUrl: './oic.component.html',
  styleUrls: ['./oic.component.css']
})
export class OicComponent implements OnInit {

  public loggedInUser: User;
 

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
      this.loggedInUser = this.authorizationService.getLoggedInUser();
  }

  logoutClicked() {
    console.log("logout clicked from ngb-navbar");
    localStorage.clear();
    this.authorizationService.logout();
  }
 
}
