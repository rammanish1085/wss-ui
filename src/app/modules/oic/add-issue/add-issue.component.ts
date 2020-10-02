import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { ProjectUserMappingService } from 'src/app/services/project/project-user-mapping.service';
import { UserService } from 'src/app/services/users/user.service';
import { ProjectDescriptionService } from 'src/app/services/project/project-description.service';
import { ProjectProblemStatementService } from 'src/app/services/project/project-problem-statement.service';
import {IssueMasterService} from 'src/app/services/project/issue-master.service'
import {GobalutilityService} from 'src/app/utility/gobalutility.service'
import { map } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.css']
})
export class AddIssueComponent implements OnInit {


  constructor(private authorizationService: AuthorizationService, private projectDescriptionService: ProjectDescriptionService, private issueMasterService:IssueMasterService,
    private userService: UserService,private globalutilityService:GobalutilityService, private projectUserMappingService: ProjectUserMappingService, private projectProblemStatmentService: ProjectProblemStatementService) { }

  projectsOic: any;

  projectsOther: any;

  role: string;

  username: string;

  loggedInUser: User;

  locationCode: any;

  locationName:string;

  name: string;

  moduleList: any;

  isOther: boolean;

  isAttachment :boolean;

  projectProblemStatmentList: any;

  issueMaster: any = {};

  insertIssueMaster:any={};

  tokenId:any;

  public fieldArray: Array<any> = [];
  public newAttribute: any = {};

  ngOnInit() {
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.role = this.loggedInUser.getRole();
    this.username = this.loggedInUser.getUsername();
    this.name = this.loggedInUser.getName();
    this.locationCode = this.loggedInUser.getLocationCode();
    this.locationName = this.loggedInUser.getLocationShortName();


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
    console.log(this.issueMaster.projectModule.projectModule);
    this.projectProblemStatmentService.getProjectProblemStatementByModule(this.issueMaster.projectModule.id).subscribe(success => {
      if (success.status === 200) {
        this.projectProblemStatmentList = success.body;
        // this.reset();
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
  onClickSubmit(){
     
   this.preparedIssueMasterObject();
   this.issueMasterService.insertIssueMaster(this.insertIssueMaster).subscribe(success=>{

    if(success.status === 201){
      this.tokenId = success.body;
      this.globalutilityService.successAlertMessage("Issue Created Successfully With Id:"+this.tokenId.tokenNumber);
      this.resetForm();
    }
},error=>{})
}

  private preparedIssueMasterObject(){
    this.insertIssueMaster.username=this.username;
    this.insertIssueMaster.name=this.name;
    this.insertIssueMaster.locationCode = this.locationCode;
    this.insertIssueMaster.locationName =this.locationName;
    this.insertIssueMaster.projectName = this.issueMaster.projectName;
    this.insertIssueMaster.projectModule = this.issueMaster.projectModule.projectModule;
    this.insertIssueMaster.problemStatement = this.issueMaster.problemStatement;
    this.insertIssueMaster.subject=this.issueMaster.subject;
    this.insertIssueMaster.description= this.issueMaster.description;
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
  resetForm(){
    this.issueMaster.projectModule = undefined;
    this.issueMaster.projectName = undefined;
    this.issueMaster.problemStatement = undefined;
    this.issueMaster.subject=undefined;
    this.issueMaster.description= undefined;
  }
   

}
