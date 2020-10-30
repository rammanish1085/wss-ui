import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { UserService } from 'src/app/services/users/user.service';
import { ProjectUserMappingService } from 'src/app/services/project/project-user-mapping.service';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  project: any;
  users: any;
  projectUserMappingObject: any = {};
  loggedInUser: User;
  projectUserMapping: any;
  locationCode: string;

  userProjectFrom: FormGroup;
  isProcessing: boolean;

  constructor(private userService: UserService, private authorizationService: AuthorizationService, private projectUserMappingService: ProjectUserMappingService, private globalUtilityService: GobalutilityService) { }

  ngOnInit() {

    this.userProjectFrom = new FormGroup({
      project: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required)
     
    });
    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.locationCode = this.loggedInUser.getLocationCode();

    this.getProject();
    this.getUsers();
    this.getAssignProject();
  }

  public getProject() {
    console.log('Getting Data Called');
    this.userService.getAllProject().subscribe(succes => {
      console.log('succes');
      console.log(succes.body);
      this.project = succes.body;
    }, error => {
      console.log('error');
      console.log(error);

    });

  }

  private getUsers() {
    console.log('Getting USers');
    this.userService.getAllUsers(this.locationCode, 'oic').subscribe(success => {
      console.log(success.body);
      this.users = success.body;
    }, () => {

      // this.project=succes.body;

    });

  }

  onclickAddUserProject() {

    this.isProcessing = true;
    console.log('Getting form value');

    console.log(this.userProjectFrom.value);

    this.prepareProjectUserMapping();
    this.projectUserMappingService.insertProjectUserMapping(this.projectUserMappingObject).subscribe(success => {
      this.isProcessing = false;
      this.globalUtilityService.successAlertMessage('Project assigned successfully !!!');
      this.reset();
      this.getAssignProject();
    },error => {
      console.log(error);
      this.isProcessing = false;
      this.globalUtilityService.errorAlertMessage('Project already exist for selected user !!!');
      this.reset();
    });

  }

  prepareProjectUserMapping() {
    this.projectUserMappingObject.username = this.userProjectFrom.value.user.username;
    this.projectUserMappingObject.name = this.userProjectFrom.value.user.name;
    this.projectUserMappingObject.locationCode = this.loggedInUser.getLocationCode();
    this.projectUserMappingObject.locationName = this.loggedInUser.getLocationShortName();
    this.projectUserMappingObject.projectName = this.userProjectFrom.value.project.name;
    this.projectUserMappingObject.deleted = false;
    this.projectUserMappingObject.createdBy = this.loggedInUser.getUsername() + ' ' + this.loggedInUser.getName();
  }

  getAssignProject() {

    this.projectUserMappingService.getAssignedProjectList(this.loggedInUser.getLocationCode()).subscribe(success => {
      this.projectUserMapping = success.body;
      console.log('Inside ger Assigned Project');
      console.log(this.projectUserMapping);
    }, () => {
    });

  }

  onClickDeleteUser(project: any, index: any) {
    console.log('Onclick Called');
    let confirmAlertResponse = this.globalUtilityService.confirmAlertMessage("Do you want to delete User ?");
    confirmAlertResponse.then((result) => {
      if (result.value) {
        this.deleteUser(project);
      }
    });

  }

  deleteUser(project: any) {

    let index = this.projectUserMapping.indexOf(project);

    this.userService.deleteById(project.id).subscribe(success => {


      console.log("inside success");

      console.log(success);

      console.log(success.body);

      if (success.status === 200) {
        this.globalUtilityService.successAlertMessage("User Deleted Successfully.");
        this.projectUserMapping.splice(index, 1);
      }
    }, error => { })

  }


  reset() {
    this.userProjectFrom.patchValue({
      project: '',
      user: ''
    });
  }

}
