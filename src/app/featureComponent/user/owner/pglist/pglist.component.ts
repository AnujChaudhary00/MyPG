import { Component, OnInit } from '@angular/core';
import {PgServiceService} from '../../../../services/pgService/pg-service.service'
import { FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pglist',
  templateUrl: './pglist.component.html',
  styleUrls: ['./pglist.component.css']
})
export class PglistComponent implements OnInit {

  constructor(private pgServe:PgServiceService,private fb: FormBuilder) { }
  PgList:any
  state=['Andhra Pradesh','	Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];
  updateform:FormGroup;
  show:boolean=false;

  ngOnInit(): void {

    this.updateform = this.fb.group(
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
        email: ['', Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]$")],
        id:[''],
        totalroom:['',Validators.pattern("[0-9]*$")]
      }
    );

    this.pgServe.getPgDetail(localStorage.getItem('id')).subscribe(res=>{
      if(res.status==200)
      {
        this.PgList=res.result;
      }else{
        console.log(res.message);
      }
    },err=>{
      console.log(err);
    })

  }

  formAppear()
  {
    if(this.show==false){
    this.show=true;
    }else{
      this.show=false;
    }
  }
  id:any
  showData(id)
  {
    this.id=id;
    this.pgServe.getPgDetail(id).subscribe(res=>{
      this.updateform.value.pgname=res.result.pgname;
      this.updateform.value.bed=res.result.bed;
      this.updateform.value.type=res.result.type;
      this.updateform.value.rent=res.result.rent;
      this.updateform.value.email=res.result.email;
      this.updateform.value.contactno=res.result.contactno;
      this.updateform.value.totalroom=res.result.totalroom;
      this.updateform.value.discripition=res.result.discripition;
      this.updateform.value.state=res.result.state;
      this.updateform.value.pincode=res.result.pincode;
      this.updateform.value.country=res.result.country;
      this.updateform.value.city=res.result.city;
      console.log(res.result);
    },err=>{
      console.log(err);
    })
  }

  updatePg()
  {
    this.pgServe.updatePg(this.id,this.updateform.value).subscribe(res=>{
      if(res.status==200)
      {
        alert("success");
        this.show=false;
      }
    },err=>{
      console.log(err);
    })
  }

  deletePg(id)
  {
    this.pgServe.deletePg(id).subscribe(res=>{
      if(res.status==200)
      {
        alert("successfully deleted");
        location.reload();
      }
    },err=>{
      console.log(err);
    })
  }

}
