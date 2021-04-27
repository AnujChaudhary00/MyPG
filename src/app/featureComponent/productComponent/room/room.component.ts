import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import jquery from 'jquery';
import bootstrap from 'bootstrap';
import {PgServiceService} from '../../../services/pgService/pg-service.service'
import { pgList } from 'src/app/models/pg.type';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements AfterViewInit {

  @ViewChild('searchForm') searchForm:NgForm

  constructor(private pgServe:PgServiceService,private route:Router, private r:ActivatedRoute) { }
  pgList;
  pgCount=0;
  mainImage;
  ngAfterViewInit(): void {


    this.pgServe.getAllPg().subscribe(res=>{
      this.pgList=res.result;
      this.pgCount=res.recordCount;
    })

    const formValue=this.searchForm.valueChanges;
    formValue.pipe(
      filter(()=>this.searchForm.valid),
      pluck('searchTerm'),
      debounceTime(700),
      distinctUntilChanged(),
      switchMap(data=>this.pgServe.searchPg(data))
    ).subscribe(res=>{
      this.pgList=res.result;
      this.pgCount=res.count;
    },err=>{
      console.log(err);
    });

//     const searchFocus = document.getElementById('search-focus');
// const keys = [
//   { keyCode: 'AltLeft', isTriggered: false },
//   { keyCode: 'ControlLeft', isTriggered: false },
// ];

// window.addEventListener('keydown', (e) => {
//   keys.forEach((obj) => {
//     if (obj.keyCode === e.code) {
//       obj.isTriggered = true;
//     }
//   });

//   const shortcutTriggered = keys.filter((obj) => obj.isTriggered).length === keys.length;

//   if (shortcutTriggered) {
//     searchFocus.focus();
//   }
// });

// window.addEventListener('keyup', (e) => {
//   keys.forEach((obj) => {
//     if (obj.keyCode === e.code) {
//       obj.isTriggered = false;
//     }
//   });
// });
  }

  CheckIn(id)
  {
    console.log(id);
    this.route.navigate(["check/"+id],{ relativeTo: this.r });
  }

}
