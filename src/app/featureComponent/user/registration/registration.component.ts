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
  register: any;
  userType: String

  ngOnInit(): void {


    this.register = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dob: ['', Validators.required],
        email: ['', Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
        password: [''],
        phone: ['', [Validators.required, Validators.minLength(10)]],
        gender: ['', Validators.required],
        confirmPassword: [''],
        role: ['']
      },
      {
        validator: this.matchPassword
      }
    );

    $(function () {
      $("#datepicker").datepicker();
    });


  }

  fetchvalue() {

  }

  onSubmit() {
    this.authService.register(this.register.value);
  }

}
