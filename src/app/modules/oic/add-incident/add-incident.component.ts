import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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



  constructor() { }

  incidentMasterForm: FormGroup;

  ngOnInit(){

    this.incidentMasterForm = new FormGroup({
      incident: new FormControl('', Validators.required),
      incidentObject: new FormControl('', Validators.required),
      incidentobjecType: new FormControl('', Validators.required),
      employeeType: new FormControl('', Validators.required),
      incidentDescription : new FormControl('', Validators.required)
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
