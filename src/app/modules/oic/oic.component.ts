import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';

@Component({
  selector: 'app-oic',
  templateUrl: './oic.component.html',
  styleUrls: ['./oic.component.css']
})
export class OicComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
  }

  logoutClicked() {
    console.log("logout clicked from ngb-navbar");
    localStorage.clear();
    this.authorizationService.logout();
  }

}
