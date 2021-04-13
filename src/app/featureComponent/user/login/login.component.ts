import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, AbstractControl,ValidationErrors} from '@angular/forms';
import { AuthServiceService } from '../../../services/authService/auth-service.service';
import {ActivatedRoute,ActivatedRouteSnapshot, Params} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthServiceService, private route:ActivatedRoute) { }

  login
  error
  showError$
  ngOnInit(): void {
    this.route.queryParams.subscribe(res=>{
      this.error=res['id'];
      console.log(this.error);
      if(this.error==404)
      {
        this.showError$="Please enter the correct email";
      }
      else if(this.error==401)
      {
        this.showError$="Incorrect password! please enter the correct password";
      }
      else if(this.error==500){
        this.showError$="Internal server error";
      }
    
    });
    this.login=this.fb.group({
      email:['',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      password:['']
    })
  }


  onSubmit()
  {
    this.authService.login(this.login.value);
  }

 

}
