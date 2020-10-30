import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {IssueStatusService} from 'src/app/services/project/issue-status.service'
 
@Component({
  selector: 'app-track-issue',
  templateUrl: './track-issue.component.html',
  styleUrls: ['./track-issue.component.css']
})
export class TrackIssueComponent implements OnInit {
  
  statusList:any;
  tokenNumber:string;
  isStatus :boolean;
  tokenSearchFrom :FormGroup
  isProcessing: boolean;
  constructor(private issueStatusService:IssueStatusService) { }

  ngOnInit(): void {

    this.tokenSearchFrom = new FormGroup({
      tokenNumber: new FormControl('', Validators.required),
      });
    
  }
  searchClicked() {
    this.isProcessing = true;
    console.log("seacrch clicked");
    console.log(this.tokenSearchFrom.value);
    this.tokenNumber =this.tokenSearchFrom.value.tokenNumber;
    
      this.issueStatusService.getRequestInformation(this.tokenSearchFrom.value.tokenNumber).subscribe(success=>{
      this.isStatus = true;
      this.isProcessing = false;
      console.log("inside succes");
      console.log(success.body);
      this.statusList = success.body;
      this.reset();

    },error=>{
      this.isProcessing = false;
      this.reset()

    })
    
  }

  reset() {
    this.tokenSearchFrom.patchValue({
      tokenNumber: ''     
    });
  }

}
