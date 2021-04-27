import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import * as $ from 'jquery';

import {PgServiceService} from '../../../../services/pgService/pg-service.service';

@Component({
  selector: 'app-add-pg',
  templateUrl: './add-pg.component.html',
  styleUrls: ['./add-pg.component.css']
})
export class AddPgComponent implements OnInit {

  constructor(private fb: FormBuilder,private pgServe:PgServiceService,private router:Router) { }
  savePg:FormGroup;
  state=['Andhra Pradesh','	Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];
  city=['Law gate', 'Jalandhar', 'Ludhiana', 'Phagwara', 'Hardaspur','Chandigarh', 'Delhi','Mumbai','Kolkata','Ahemdabad','Bhopal','Srinagar','Patna','Meerut','Lucknow','Karnal','Ambala','Bhiwani','Banglore', 'Gurgaon', 'Noida']
  filesToUpload: Array<File> = [];

  ngOnInit(): void {
    this.savePg = this.fb.group(
      {
        pgname:['', Validators.required],
        ownername:['', Validators.required],
        bed:['', [Validators.required,Validators.pattern("[0-9]*$")]],
        city:['', Validators.required],
        pincode:['', [Validators.required,Validators.pattern("[0-9]{6}$")]],
        country:['',Validators.required],
        state:['', Validators.required],
        discription:['', Validators.required],
        type:['', Validators.required],
        rent:['', [Validators.required,Validators.pattern("[0-9]{2,5}$")]],
        contactno:['', [Validators.required, Validators.minLength(10)]],
        email: ['', Validators.pattern("[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]$")],
        id:[''],
        totalroom:['',Validators.pattern("[0-9]*$")]
      }
    );
  }


  onSubmit()
  {
    this.savePg.value.id=localStorage.getItem('id');
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    for(let i =0; i < files.length; i++){
      formData.append("uploads[]", files[i], files[i]['name']);
    }

    formData.append('pgname',this.savePg.value.pgname);
    formData.append('ownername',this.savePg.value.ownername);
    formData.append('bed',this.savePg.value.bed);
    formData.append('city',this.savePg.value.city);
    formData.append('pincode',this.savePg.value.pincode);
    formData.append('country',this.savePg.value.country);
    formData.append('state',this.savePg.value.state);
    formData.append('discription',this.savePg.value.discription);
    formData.append('type',this.savePg.value.type);
    formData.append('rent',this.savePg.value.rent);
    formData.append('contactno',this.savePg.value.contactno);
    formData.append('email',this.savePg.value.email);
    formData.append('id',this.savePg.value.id);
    formData.append('totalroom',this.savePg.value.totalroom);

    this.pgServe.AddPg(formData).subscribe(res=>{
      if(res.status==200)
      {
        alert("Successfully Added");
        // this.router.navigate(['dashboard/pg-List']);
      }
    },err=>{
      console.log(err);
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
}


}
