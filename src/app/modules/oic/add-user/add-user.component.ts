import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import {UserService} from 'src/app/services/users/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  project:any;
  users : any;
  selectedProject:any;
  selectedUser : any;
  saveUserProject :any ={};
  loggedInUser : any;
  constructor(private userService:UserService,private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.getProject();
    this.getUsers();
    this.loggedInUser = this.authorizationService.getLoggedInUser();
  }

  public getProject() {
    console.log('Getting Data Called');
    this.userService.getAllProject().subscribe(succes=>{
      console.log("succes");
      console.log(succes.body);
      this.project=succes.body;
    },error=>{
      console.log("error");
      console.log(error);

    });
    
  }

  private getUsers(){
    console.log('Getting USers');
    this.userService.getAllUsers('34420124','oic').subscribe(success=>{
      console.log(success.body);
      this.users = success.body;
    },error=>{
     
      // this.project=succes.body;

    })

  }

  onclickAddUserProject(){
    console.log(this.selectedProject.name);
    console.log(this.selectedUser.username);
    this.saveUserProject.username=this.selectedUser.username;
    this.saveUserProject.name=this.selectedUser.name;
    this.saveUserProject.projectName=this.selectedProject.name;
    this.saveUserProject.locationCode= this.loggedInUser.getLocationCode();
    this.saveUserProject.locationName= this.loggedInUser.getLocationShortName();
   console.log(this.saveUserProject);

  }
    
}
