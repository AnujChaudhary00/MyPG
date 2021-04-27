import { Component, OnInit } from '@angular/core';
import {PgServiceService} from '../../../../../services/pgService/pg-service.service';
import {TenantServiceService} from '../../../../../services/tenantService/tenant-service.service';


@Component({
  selector: 'app-tenant-dashboard',
  templateUrl: './tenant-dashboard.component.html',
  styleUrls: ['./tenant-dashboard.component.css']
})
export class TenantDashboardComponent implements OnInit {

  constructor(public pgserve:PgServiceService, public tenantServe:TenantServiceService) { }
  tenantCount:Number=0;
  grivenceCount:Number=0;
  showDashboard:boolean;
  ngOnInit(): void {

    this.tenantServe.myBookings(localStorage.getItem('id')).subscribe(res=>{
      this.tenantCount=res.count;
    })


    this.pgserve.getMyTicket(localStorage.getItem('id')).subscribe(res=>{
      this.grivenceCount=res.count;
    });

    this.tenantServe.dashboard.subscribe(res=>{
      this.showDashboard=res;
    })
  }

  donShow()
  {
    this.tenantServe.dashboard.next(false);
  }

}
