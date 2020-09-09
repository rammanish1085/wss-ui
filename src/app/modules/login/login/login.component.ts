import {AuthorizationService} from '../../../services/authorization-service/authorization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { GlobalConfiguration } from 'src/app/config/global.config';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  readonly INVALID_LOGIN_MESSAGE = "Invalid Username/Password. Try Again !";
  readonly UNABLE_LOGIN_MESSAGE = "Unable to Login. Try Again !";

  logging = false;
  authenticated = false;
  loginError = false;
  loginErrorText;
  loggedUser: User;

  user: FormGroup;

  constructor(private authorizationService: AuthorizationService, private router: Router) {
    console.log("Running LoginComponent Constructor ");
    //this.user = new User(null);
  }

  ngOnInit() {
    this.user = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
 
  processLoginForm(){
    console.log("processing");
    console.log(this.user);
    this.router.navigate(['oic']);
  }
  

  // processLoginForm() {
  //   console.log("Process Login Form started");
  //   //console.log(this.user.value);
  //   this.logging = true;
  //   //console.log('Authentication started for user ');
  //   let user = new User(this.user.value);
  //   //console.log("Authenticated user made from form control as: ");
  //   // console.log(user);
  //   // console.log(user.getUsername()+" "+user.getPassword());

  //   this.authorizationService.authenticate(user).subscribe(data => {
  //     // console.log("Data in processLoginForm");
  //     // console.log(data);
  //     let status = (<any>data).status;
  //     if (status === 200) {
  //       console.log("Login Successfull. Logged in User is: " + this.authorizationService.getLoggedInUserRole());
  //       if (this.authorizationService.isLogedIn()) {
  //         if (this.authorizationService.getLoggedInUserRole() === GlobalConfiguration.ROLE_OIC) {
  //           console.log("Authenticated user is oag. Navigating to oag homepage");
  //           this.router.navigate(['/oag']);
  //         }
  //       } else {
  //         console.log("Unable to login user");
  //         this.loginError = true;
  //         this.loginErrorText = this.UNABLE_LOGIN_MESSAGE;
  //       }
  //     }
  //     this.logging = false;
  //   }, error => {

  //     this.logging = false;
  //     this.loginError = true;
  //     console.log("Error While login");
  //     console.log(error);
  //     let status = error.status;
  //     if (status == 403 || status == 401) {
  //       this.loginErrorText = this.INVALID_LOGIN_MESSAGE;
  //     } else {
  //       this.loginErrorText = this.UNABLE_LOGIN_MESSAGE;
  //     }
  //   });
  // }
}
