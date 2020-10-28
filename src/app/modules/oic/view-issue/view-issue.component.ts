import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthorizationService } from 'src/app/services/authorization-service/authorization.service';
import { IssueMasterService } from 'src/app/services/project/issue-master.service';

@Component({
  selector: 'app-view-issue',
  templateUrl: './view-issue.component.html',
  styleUrls: ['./view-issue.component.css']
})
export class ViewIssueComponent implements OnInit {

  config: any;
  collection = [];
  loggedInUser: User;
  username: string;
  locationCode: string;
  assignedProblemStatement: Array<any>;
  isView: boolean;
  viewIssue: any;
  files: any;
  total_issues: number;
  page : number = 1;
  tokenNumber:any;

  constructor(private issueMasterService: IssueMasterService, private authorizationService: AuthorizationService, private route: ActivatedRoute, private router: Router) {
    this.assignedProblemStatement = new Array<any>()

  }

  ngOnInit(): void {
    this.assignedProblemStatement =[];

    this.loggedInUser = this.authorizationService.getLoggedInUser();
    this.username = this.loggedInUser.getUsername();
    this.locationCode = this.loggedInUser.getLocationCode();

    this.getAllAssignedProblemStatement(this.username, this.locationCode);
  }

  getAllAssignedProblemStatement(username: any, locationCode: any) {

    this.issueMasterService.getAllAssignedProblem(username, locationCode).subscribe(success => {

      console.log("Getting Assign problem");

      console.log(success.body);

      this.assignedProblemStatement = success.body;

      this.total_issues = this.assignedProblemStatement.length;

      console.log("this.total_issues"+this.total_issues);


    }, error => {

    })

  }
  public onClickView(ps: any) {

    this.viewIssue = ps;
    this.isView = true;
    this.getFileByTokenNumber(ps.tokenNumber);
    console.log("View Clicked");
    console.log(ps);

  }
  public onClickBack() {
    this.isView = false;

  }

  getFileByTokenNumber(tokenNumber: any) {

    this.issueMasterService.getFileByTokenNumber(tokenNumber).subscribe(success => {

      console.log("Gettinf File");

      console.log(success.body);

      this.files = success.body;


    }, error => {

    })

  }

  viewFileClicked(file:any){
    console.log("file view Clicked");
    console.log(file);
    this.issueMasterService.viewFileByTokenNumberAndFileName(file.tokenNumber,file.name).subscribe(success=>{
      console.log("Inside Success");
      console.log(success);
    },error=>{
      console.log("Inside erro");
      console.log(error);
    })
  }


  search()
  {
    if(this.tokenNumber=="")
    {this.ngOnInit();}
    else{
      this.assignedProblemStatement = this.assignedProblemStatement.filter(res =>{
        return res.tokenNumber.toLocaleLowerCase().match(this.tokenNumber.toLocaleLowerCase())
      })
    }
}

}
