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

  resolve()
  {
    this.pgServe.updateTicket().subscribe(res=>{
      if(res.status==500)
      {
        alert("Unable to update! Please try again later");
      }
      else if(res.status==200){
        alert("resolved Succesfully");
        location.reload();
      }
    },err=>{
      console.log(err);
    })
  }

}
