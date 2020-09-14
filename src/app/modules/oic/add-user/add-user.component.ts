import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/services/users/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  project:any;
  selectedProject:any;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.getData();
  }

  public getData() {
    console.log('Getting Data Called');
    this.userService.getAllProject().subscribe(succes=>{
      console.log("succes");
      console.log(succes.body);
      this.project=succes.body;

    },error=>{
      console.log("error");
      console.log(error);

    });
    
  }
    
}
