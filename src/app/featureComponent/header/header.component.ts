import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PgServiceService } from 'src/app/services/pgService/pg-service.service';
import {AuthServiceService} from '../../services/authService/auth-service.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth:AuthServiceService,public pgServe:PgServiceService,private route:Router,private router:ActivatedRoute) { }

  isLoggedIn=false;
  totalCount:any
  ngOnInit(): void {
    if(localStorage.getItem('token'))
    {
      this.isLoggedIn=true;
      this.pgServe.getTicketCount();
     this.pgServe.grivence$.subscribe(res=>{
        this.totalCount=res;
      });
    }
  }
    
}
