import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import {UserService} from 'src/app/services/users/user.service';
import {ProjectUserMappingService} from 'src/app/services/project/project-user-mapping.service';
import {GobalutilityService} from 'src/app/utility/gobalutility.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { User } from 'src/app/models/user.model';

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
  projectUserMappingObject :any ={};
  loggedInUser: User;
  projectUserMapping:any;
  locationCode :string;
  


  constructor(private userService:UserService,private authorizationService: AuthorizationService,private projectUserMappingService:ProjectUserMappingService,private globalUtilityService:GobalutilityService) { }

  ngOnInit() {
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.locationCode = this.loggedInUser.getLocationCode();

    this.getProject();
    this.getUsers();
    this.getAssignProject();
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
    this.userService.getAllUsers(this.locationCode,'oic').subscribe(success=>{
      console.log(success.body);
      this.users = success.body;
    },()=>{
     
      // this.project=succes.body;

    });

  }

  onclickAddUserProject(){
   this.prepareProjectUserMapping();
     this.projectUserMappingService.insertProjectUserMapping(this.projectUserMappingObject).subscribe(success=>{
       this.globalUtilityService.successAlertMessage("Project Assigned Successfully !!!")
       this.reset();
       this.getAssignProject();
     },()=>{
      this.globalUtilityService.errorAlertMessage("Project Already Exist for selected user !!!");
       this.reset();
     });

     }

  prepareProjectUserMapping(){
    this.projectUserMappingObject.username=this.selectedUser.username;
    this.projectUserMappingObject.name =this.selectedUser.name;
    this.projectUserMappingObject.locationCode=this.loggedInUser.getLocationCode();
    this.projectUserMappingObject.locationName=this.loggedInUser.getLocationShortName();
    this.projectUserMappingObject.projectName=this.selectedProject.name;
    this.projectUserMappingObject.deleted=false;
    this.projectUserMappingObject.createdBy=this.loggedInUser.getUsername() +" "+ this.loggedInUser.getName();
  }   

getAssignProject(){

  this.projectUserMappingService.getAssignedProjectList(this.loggedInUser.getLocationCode()).subscribe(success=>{
    this.projectUserMapping =success.body;
    console.log("Inside ger Assigned Project");
    console.log(this.projectUserMapping);
  },()=>{
  });

}
reset(){
  this.selectedProject =undefined;
  this.selectedUser = undefined;
}

}
