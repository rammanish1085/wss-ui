import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { ProjectUserMappingService } from 'src/app/services/project/project-user-mapping.service';
import { UserService } from 'src/app/services/users/user.service';


@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css']
})
export class AddIssueComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService,private userService:UserService,private projectUserMappingService :ProjectUserMappingService) { }

  selectedProjectOic :any;

  selectedProjectOther:any

  selectedModule :any;

  projectsOic :any;

  projectsOther :any;

  role:any;

  username: any;

  loggedInUser: User;

  locationCode:any;

  ngOnInit() {
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.role = this.loggedInUser.getRole();
    this.username = this.loggedInUser.getUsername();
    this.locationCode = this.loggedInUser.getLocationCode();
    console.log(this.loggedInUser);
    this.getOicProject();
    this.getOtherProject();
    
  }


  private getOicProject() {
    console.log('Getting Data Called');
    this.userService.getAllProject().subscribe(succes=>{
      console.log("succes");
      console.log(succes.body);
      this.projectsOic=succes.body;
    },error=>{
      console.log("error");
      console.log(error);
    });    
  }

  private getOtherProject(){

    this.projectUserMappingService.getAssignedProjectByUsernameAndLocationCode(this.username,this.locationCode).subscribe(success=>{
      this.projectsOther =success.body;
    },error=>{

    })

  }
 
}
