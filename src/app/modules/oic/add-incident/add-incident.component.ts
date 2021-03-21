import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GobalutilityService } from 'src/app/utility/gobalutility.service';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {


  incidentList: any = ['Electrical', 'Non-Electrical'];

  incidentObjectList: any = ['Human', 'Animal'];

  incidentObjectTypeList: any = ['Department', 'Outsider'];

  employeeTypeList: any = ['Regular', 'Contract', 'Outsource'];

  isHuman: boolean;

  isDepartment: boolean;

  myFiles: any[];



  constructor(private globalutilityService: GobalutilityService) { }

  incidentMasterForm: FormGroup;

  ngOnInit(){

    this.incidentMasterForm = new FormGroup({
      incident: new FormControl('', Validators.required),
      incidentObject: new FormControl('', Validators.required),
      incidentobjecType: new FormControl('', Validators.required),
      employeeType: new FormControl('', Validators.required),
      incidentDescription : new FormControl('', Validators.required),
      isAttachment:new FormControl(false)
    });
  }

  onChangeIncidentObject() {
    this.resetincidentMasterForm();
    console.log(this.incidentMasterForm.value);
    if (this.incidentMasterForm.value.incidentObject == 'Human') {
      this.isHuman = true;
                  
    } else {
      this.isHuman = false;
      this.isDepartment = false;     

    }


  }

  onChangeIncidentObjectType() {

    this.resetEmployeeType();

    console.log("incident object type called");

    console.log(this.incidentMasterForm.value.incidentobjecType);
    if (this.incidentMasterForm.value.incidentobjecType == 'Department') {
      this.isDepartment = true;
      
    } else {
      this.isDepartment = false;
           
    }

  }

  isAttachmentClicked() {
    this.incidentMasterForm.get('isAttachment').valueChanges.subscribe(checked => {
      if (checked) {
        const validators = [Validators.required];
        this.incidentMasterForm.addControl('attachment', new FormControl('', validators));
      } else {
        this.incidentMasterForm.removeControl('attachment');
      }

    });
  }


  deleteFieldValue(index) {
    if (this.myFiles.length <= 1) {
      this.myFiles.splice(index, 1);
      this.resetFile();
    } else {
      this.myFiles.splice(index, 1);
    }
  }



  onFileChange(event) {

    this.myFiles = [];

    const size = event.srcElement.files[0].size;

    console.log(size)

    if (size < 1000000) 
    { 
     if(event.target.files.length <=5){
           
      for (var i = 0; i < event.target.files.length; i++) {
        this.myFiles.push(event.target.files[i]);
      }
    } else{
        this.globalutilityService.errorAlertMessage("Maximum 5 File Allow to upload");
      }

    }else{
    this.globalutilityService.errorAlertMessage("File Size greater 1 Mb");
    }

  }

  resetFile() {
    this.incidentMasterForm.patchValue({
      attachment: '',
    });

  }

  resetincidentMasterForm() {
    this.incidentMasterForm.patchValue({
      incidentobjecType: '',
      employeeType: ''

    });
  }

  resetEmployeeType() {
    this.incidentMasterForm.patchValue({
      employeeType: ''

    });
  }


  onSubmitIncidentMasterForm() {

  }

}
