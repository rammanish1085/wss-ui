import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/services/users/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  public getData() {
    console.log('Getting Data Called');
    this.userService.getProject().subscribe(succes=>{
      console.log("succes");
      console.log(succes.body);

    },error=>{
      console.log("error");
      console.log(error);

    });
    
  }
    
}
