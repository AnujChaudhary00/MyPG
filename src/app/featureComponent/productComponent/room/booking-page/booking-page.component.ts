import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userService/user-service.service';
import {PgServiceService} from '../../../../services/pgService/pg-service.service'
import {TenantServiceService} from '../../../../services/tenantService/tenant-service.service'

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent implements OnInit {

  pg:any;
  userdetail:any;
  constructor(private route:Router,public pgserve:PgServiceService, private tenantServe:TenantServiceService,public user:UserServiceService ) { }
  isChecked:boolean=false;
  ngOnInit(): void {
    this.pgserve.getPg(localStorage.getItem('pgid')).subscribe(res=>{
      this.pg=res.result;
    });

    this.user.getUserProfile(localStorage.getItem('id')).subscribe(res=>{
      this.userdetail=res.results;
    })
  }

    onSubmit()
    {
      let tenantobj=
      {
       userid:localStorage.getItem('id'),
       pgid:localStorage.getItem('pgid'),
       pgbookedname:this.pg.pgname,
       email:this.userdetail.email,
       phone:this.userdetail.phone,
       name:`${this.userdetail.firstname} ${this.userdetail.lastname}`,
       payment:this.pg.rent,
       ownerid:this.pg.ownerid
      }

      this.tenantServe.bookPg(tenantobj).subscribe(res=>{
        console.log(res);
        alert("success");
        this.route.navigate(['/tenant-dashboard/my-account']);
      });
    }


}
