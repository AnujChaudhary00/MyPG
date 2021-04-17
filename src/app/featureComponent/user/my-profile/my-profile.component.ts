import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import * as $ from 'jquery';

import {UserServiceService} from '../../../services/userService/user-service.service'


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private fb: FormBuilder,private userServe:UserServiceService) { }
  saveProfile:FormGroup;
  url
  ngOnInit(): void {
    this.userServe.getUserProfile(localStorage.getItem('id')).subscribe(res=>{
  
      this.saveProfile = this.fb.group(
        {
          firstName: [res.results.firstname, Validators.required],
          lastName: [res.results.lastname, Validators.required],
          dob: [res.results.dob, Validators.required],
          email: [res.results.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
          phone: [res.results.phone, [Validators.required, Validators.minLength(10)]],
          gender: [res.results.gender, Validators.required],
          password:[res.results.password],
          role:[res.results.role]
        }
      );

      this.url=res.results.profilepic;
      console.log(this.url)

    },err=>{
      console.log(err);
    });

    $(function () {
      $("#datepicker").datepicker();
    });
  }

  onSubmit(data)
  {
    console.log(data);
    this.userServe.updateUser(localStorage.getItem('id'),this.saveProfile.value).subscribe(res=>{
      console.log("Success");
      location.reload();
    },err=>{
      console.log(err);
    })
  }


}
