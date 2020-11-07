
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service'
import { GobalutilityService } from 'src/app/utility/gobalutility.service';
import { RequestInformationService } from 'src/app/services/project/request-information.service'
import { IssueMasterService } from 'src/app/services/project/issue-master.service';
import { GlobalConstants } from 'src/app/utility/global.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInUser: User;
  username: string;
  locationCode: string;
  assignedProblemStatement: any;
  files: any;
  isView: boolean;
  viewIssue: any;
  isDisable: boolean;
  isForward: boolean;
  isRequestInfo: boolean;
  isResolve: boolean;
  isReject: boolean;
  name: string;
  forwardIssue: any;
  requestInfoUser: any;
  requestInfoForm; rejectForm; resolveForm: FormGroup;
  requestForwardForm: FormGroup;
  requestInfoObject: any = {};
  isProcessing: boolean;
  

  constructor() { }

  ngOnInit(): void {
    
  }
 
}
