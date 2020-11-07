import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {IssueStatusService} from 'src/app/services/project/issue-status.service'
import { GobalutilityService } from 'src/app/utility/gobalutility.service';
 
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
  constructor(private issueStatusService:IssueStatusService,private globalutilityService: GobalutilityService) { }

  ngOnInit(): void {

    this.tokenSearchFrom = new FormGroup({
      tokenNumber: new FormControl('', Validators.required),
      });
    
  }
  searchClicked() {
    this.isProcessing = true;
     this.tokenNumber =this.tokenSearchFrom.value.tokenNumber;
      this.issueStatusService.getRequestInformation(this.tokenSearchFrom.value.tokenNumber).subscribe(success=>{
      this.isProcessing = false;
      if(success.status === 200){
        this.statusList = success.body;
        this.reset();
      }if(success.status === 204){
        this.globalutilityService.errorAlertMessage("Issue not found with given token number !!");
        this.statusList =[];
        this.reset();
      }
      

    },error=>{
      console.log(error);
      
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
