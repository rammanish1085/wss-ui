import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { ProjectUserMappingService } from 'src/app/services/project/project-user-mapping.service';
import { UserService } from 'src/app/services/users/user.service';
import { ProjectDescriptionService } from 'src/app/services/project/project-description.service';
import { ProjectProblemStatementService } from 'src/app/services/project/project-problem-statement.service';


@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css']
})
export class AddIssueComponent implements OnInit {


  constructor(private authorizationService: AuthorizationService, private projectDescriptionService: ProjectDescriptionService,
    private userService: UserService, private projectUserMappingService: ProjectUserMappingService, private projectProblemStatmentService: ProjectProblemStatementService) { }

  projectsOic: any;

  projectsOther: any;

  role: any;

  username: any;

  loggedInUser: User;

  locationCode: any;

  moduleList: any;

  isOther: boolean;

  projectProblemStatmentList: any;

  issueMaster: any = {};

  public fieldArray: Array<any> = [];
  public newAttribute: any = {};

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
    this.userService.getAllProject().subscribe(succes => {
      console.log("succes");
      console.log(succes.body);
      this.projectsOic = succes.body;
    }, error => {
      console.log("error");
      console.log(error);
    });
  }

  private getOtherProject() {

    this.projectUserMappingService.getAssignedProjectByUsernameAndLocationCode(this.username, this.locationCode).subscribe(success => {
      this.projectsOther = success.body;
    }, error => {
      this.reset();

    })

  }

  onChangeProjectOic() {
    console.log("onChangeProjectOic called");
    this.reset();
    console.log(this.issueMaster);
    this.projectDescriptionService.getProjectModuleByProjectName(this.issueMaster.projectName).subscribe(success => {
      if (success.status === 200) {
        this.moduleList = success.body;
      } else if (success.status === 204) {
       console.log("onChangeProjectOic called No content found");

      }

    }, error => { })
  }

  onChangeProjectOther() {
    this.reset();
    this.projectDescriptionService.getProjectModuleByProjectName(this.issueMaster.projectName).subscribe(success => {
      if (success.status === 200) {
        this.moduleList = success.body;
      } else if (success.status === 204) {
        console.log("onChangeProjectOther() called no content found");
      }

    }, error => {
      this.reset();
    })

  }

  onChangeProjectModule() {
    console.log("onChangeProjectModule() called");
    this.isOther = true;
    console.log(this.issueMaster.projectModule.id);
    this.projectProblemStatmentService.getProjectProblemStatementByModule(this.issueMaster.projectModule.id).subscribe(success => {
      if (success.status === 200) {
        this.projectProblemStatmentList = success.body;
        this.reset();
      }
      else if (success.status === 204) {
        this.isOther = false;
        this.issueMaster.problemStatement = undefined;
      }

    }, error => {
      console.log("onChangeProjectModule() called error");
      this.reset();
    })
  }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }
  reset() {
    //  this.selectedModule = undefined;
    this.issueMaster.projectModule = undefined;
    this.issueMaster.problemStatement = undefined;
  }

}
