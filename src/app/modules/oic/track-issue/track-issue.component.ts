import { Component, OnInit } from '@angular/core';
import {IssueStatusService} from 'src/app/services/project/issue-status.service'
 
@Component({
  selector: 'app-track-issue',
  templateUrl: './track-issue.component.html',
  styleUrls: ['./track-issue.component.css']
})
export class TrackIssueComponent implements OnInit {
  
  statusList:any;
  constructor(private issueStatusService:IssueStatusService) { }

  ngOnInit(): void {
    this.getStatus();
  }
  getStatus() {
    this.issueStatusService.getRequestInformation("NGB-1-26102020-22").subscribe(success=>{
      console.log("inside succes");
      console.log(success.body);
      this.statusList = success.body;

    },error=>{

    })
    
  }

}
