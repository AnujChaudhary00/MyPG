import { Component, OnInit } from '@angular/core';
import {PgServiceService} from '../../../../services/pgService/pg-service.service';
import {TenantServiceService} from '../../../../services/tenantService/tenant-service.service';


@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit {

  constructor(public pgserve:PgServiceService, public tenantServe:TenantServiceService) { }

  pgCount:Number=0;
  tenantCount:Number=0;
  grivenceCount:any;
  ngOnInit(): void {

    this.pgserve.getPgDetail(localStorage.getItem('id')).subscribe(res=>{

      this.pgCount=res.count;
    });

   this.pgserve.grivence$.subscribe(res=>{
    this.grivenceCount =res;
   });


    this.tenantServe.getMyTenant(localStorage.getItem('id')).subscribe(res=>{
      this.tenantCount=res.count;
    });

  }
  showDashboard:boolean=true;

    donShow()
    {
      this.showDashboard=false;
    }

    donShowNo()
    {
      this.showDashboard=true;
    }
}
