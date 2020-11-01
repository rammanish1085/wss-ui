import { Component, Input, OnInit } from '@angular/core';
import {AuthorizationService} from '../../services/authorization-service/authorization.service';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  private readonly CLASS_NAME = "LoginModalComponent : ";

  modalInstance: any;
  username;

  readonly INVALID_LOGIN_MESSAGE = "Invalid Username/Password. Try Again !";
  readonly UNABLE_LOGIN_MESSAGE = "Unable to Login. Try Again !";

  logging = false;
  authenticated = false;
  loginError = false;
  loginErrorText;
  user;

  constructor(private authorizationService : AuthorizationService) { }

  ngOnInit() {
    console.log(this.CLASS_NAME + "ngOnInit called")
    let loggedInUser = this.authorizationService.getLoggedInUser();
    if(loggedInUser){
      this.username = loggedInUser.getUsername();
    }else{
      console.error(this.CLASS_NAME + "loggedInUser found NULL");
    }

    this.user = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('',Validators.required)
    });

    console.log(this.CLASS_NAME + "Loging out session");
    this.authorizationService.sessionLogout();
  }

  /**
   * Function which will be called by Angular 
   * when setting modalInstance attribute on this components
   * selector
   */
  @Input("modalInstance")
  set setModalInstance(modalInstance : any){
    this.modalInstance = modalInstance;
  }

  processLoginForm() {
    console.log(this.CLASS_NAME + "Process Login Form started");
    //console.log(this.user.value);
    this.logging = true;
    //console.log('Authentication started for user ');
    let user = new User(this.user.value);
    user.setUsername(this.username);
    console.log(this.CLASS_NAME + "Authenticated user made from form control as: ");
    console.log(user);
    this.authorizationService.authenticate(user).subscribe(data => {
        //let status = data.status;
        let status = (<any>data).status;
        if(status === 200){
          console.log(this.CLASS_NAME + "Re Login Successfull. Logged in User is: ");
          if(this.authorizationService.isLogedIn()){
            this.modalInstance.close("Logged In successfully");
          }else {
            console.log(this.CLASS_NAME + "Unable to login user");
            this.loginError = true;
            this.loginErrorText = this.UNABLE_LOGIN_MESSAGE;
          }
        }
        this.logging = false;
     }, error => {
       this.logging = false;
       this.loginError = true;
       console.log(this.CLASS_NAME + "Error While login");
       console.log(error);
       let status = error.status;
       if(status == 403 || status == 401){
         this.loginErrorText = this.INVALID_LOGIN_MESSAGE;
         if(error.error){
          this.loginErrorText = error.error;
        }
       }else{
         this.loginErrorText = this.UNABLE_LOGIN_MESSAGE;
       }
     });
  }

  public logoutClicked(){
    console.log(this.CLASS_NAME + "logoutClicked called");
    if(this.modalInstance){
      this.modalInstance.dismiss("logout");
    }
  }

}
