import {AuthorizationService} from '../../../services/authorization-service/authorization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FormBuilder } from '@angular/forms';
import {OtpService} from 'src/app/services/OTP/otp.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';


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
  isLogIn : boolean = true;

  user: FormGroup;


  form: FormGroup = new FormGroup({});

  constructor(private authorizationService: AuthorizationService, private router: Router,
    private fb: FormBuilder,private otpService:OtpService,private globalutilityService:GobalutilityService) {
    this.form = fb.group({
      number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    })
    console.log("Running LoginComponent Constructor ");
    //this.user = new User(null);
  }

  ngOnInit() {
    this.user = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });    
  }
   
  
  processLoginForm() {
    console.log("Process Login Form started");
    console.log(this.user.value);
    this.logging = true;
    let user = new User(this.user.value);
    this.authorizationService.authenticate(user).subscribe(data => {
      let status = (<any>data).status;
      if (status === 200) {
        console.log(data);
        console.log("Login Successfull. Logged in User is: " + this.authorizationService.getLoggedInUserRole());
        if (this.authorizationService.isLogedIn()) {
          this.isLogIn = false;
          this.loggedUser = this.authorizationService.getLoggedInUser();
          this.generateOTP();
        } else {
          console.log("Unable to login user");
          this.loginError = true;
          this.loginErrorText = this.UNABLE_LOGIN_MESSAGE;
        }
      }
      this.logging = false;
    }, error => {

      this.logging = false;
      this.loginError = true;
      console.log("Error While login");
      console.log(error);
      let status = error.status;
      if (status == 403 || status == 401) {
        this.loginErrorText = this.INVALID_LOGIN_MESSAGE;
      } else {
        this.loginErrorText = this.UNABLE_LOGIN_MESSAGE;
      }
    });
  }

  generateOTP() {
    this.otpService.generateOTP().subscribe(success => {
      console.log("Inside success generating otp");
      // console.log(success.body);
      if (success.status === 200) {
        console.log("OTP Generated Successfully");

      }
    }, error => {
      console.log("Error while generating OTP");

    })
  }


  processOtpForm() {
    this.otpService.validateOTP(this.form.value.number).subscribe(success => {
      if (success.status === 200) {
        this.router.navigate(['oic']);
      }

    }, error => {
      if (error.status === 400) {
        this.globalutilityService.alertWithSuccess("Enter OTP is not valid !!")
      } else if (error.status === 401) {
        this.globalutilityService.alertWithSuccess("OTP has been expired !!");
      } else if (error.status === 417) {
        this.globalutilityService.alertWithSuccess("Enter OTP is not matched !!");
      }
    })
  }

  get f(){
    return this.form.controls;
  }
      

}
