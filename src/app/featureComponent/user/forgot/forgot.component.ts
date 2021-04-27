import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators, AbstractControl,ValidationErrors} from '@angular/forms';
import { AuthServiceService } from '../../../services/authService/auth-service.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthServiceService) { }
  forgot
  ngOnInit(): void {

    this.forgot=this.fb.group({
      email:['',Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$")]
    })
  }
  alertSuccess:boolean;
  alertFail:boolean;
  someError:boolean;
  onSubmit()
  {
    console.log(this.forgot.value.email)
    this.authService.forgotPassword(this.forgot.value.email).subscribe(res=>{
      if(res.status==200)
      {
        this.alertSuccess=true;
        this.alertFail=false;
      }
      else if(res.status==401){
        this.alertFail=true;
      }
      else
      {
        this.someError=true;
      }
    },err=>{
      this.someError=true;
      console.log(err);
    })
  }

}
