import { Component, OnInit } from '@angular/core';
import {TenantServiceService} from '../../../../services/tenantService/tenant-service.service'


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(public tenantServe:TenantServiceService) { }
  myproperty
  ngOnInit(): void {
    this.tenantServe.myBookings(localStorage.getItem('id')).subscribe(res=>{
      this.myproperty=res.result;
      console.log(res.result);
    })
  }

}
