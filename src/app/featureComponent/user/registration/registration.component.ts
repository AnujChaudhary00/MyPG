import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthServiceService } from '../../../services/authService/auth-service.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthServiceService) { }

  matchPassword(control: AbstractControl): ValidationErrors | null {

    const password = control.get("password").value;
    const confirm = control.get("confirmPassword").value;


    if (password != confirm) { return { 'noMatch': true } }

    return null

  }
  fileToUpload: File = null;
  register: any;
  userType: String;
  imagePreview:string;
  phoneno:string;
  enterCode:boolean
  code:Number;
  showRegister:boolean=false;
  invalidOtp:boolean=false; 

  ngOnInit(): void {


    this.register = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dob: ['', Validators.required],
        email: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
        password: [''],
        gender: ['', Validators.required],
        confirmPassword: [''],
        role: [''],
        profilepic:[null]
      },
      {
        validator: this.matchPassword
      }
    );

    $(function () {
      $("#datepicker").datepicker();
    });


  }

  handleFileInput(files:FileList)
  {
    this.fileToUpload=files.item(0);
  }

    sendCode()
    {
      if(this.phoneno==null || this.phoneno.length!=10){
        alert("Please Enter 10 digit Phone Number ")
    }else{
      this.authService.phoneverify(this.phoneno).subscribe(res=>{
        console.log(res);
        if(res.status=="pending")
        {
          this.enterCode=true;
        }
       })
     }
    }

    verifyCode()
    {
      console.log("Verfiyung...")
      this.authService.getCodeVerify(this.code,this.phoneno).subscribe(res=>{
        if(res.status==="approved")
        {
          this.showRegister=true;
          this.enterCode=false;
          console.log(res);
        }
        else{
          console.log("Invalid otp");
          this.invalidOtp=true;
        }
      })
    }

  onSubmit() {
    const formdata=new FormData();
    formdata.append('firstName',this.register.value.firstName);
    formdata.append('lastName',this.register.value.lastName);
    formdata.append('dob',this.register.value.dob);
    formdata.append('email',this.register.value.email);
    formdata.append('password',this.register.value.password);
    formdata.append('phone',this.phoneno);
    formdata.append('gender',this.register.value.gender);
    formdata.append('role',this.register.value.role);
    formdata.append("profilepic", this.fileToUpload, this.fileToUpload.name);
    console.log(formdata);
    this.authService.register(formdata);
  }

  onSelect(event:Event)
  {
    const file:File=(event.target as HTMLInputElement).files[0];
    this.register.patchValue({
      profilepic:file
    });
    this.register.get('profilepic').updateValueAndValidity();

    const reader=new FileReader();

    reader.onload=()=>{
      this.imagePreview=reader.result.toString();
    };

    if(file){
      reader.readAsDataURL(file);
    }
  }

}
