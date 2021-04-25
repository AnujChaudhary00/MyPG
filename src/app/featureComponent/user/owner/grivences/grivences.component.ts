import { Component, OnInit } from '@angular/core';
import {PgServiceService} from '../../../../services/pgService/pg-service.service'

@Component({
  selector: 'app-grivences',
  templateUrl: './grivences.component.html',
  styleUrls: ['./grivences.component.css']
})
export class GrivencesComponent implements OnInit {

  constructor(public pgServe:PgServiceService) { }

  grivences:any;
  totalCount:any;
  ngOnInit(): void {
    this.pgServe.getTicket(localStorage.getItem('id')).subscribe(res=>{
      this.grivences=res.result;
      this.totalCount=res.count;
    })
  }

}
