import { Component, OnInit } from '@angular/core';
import jquery from 'jquery';
import bootstrap from 'bootstrap';
import {PgServiceService} from '../../../services/pgService/pg-service.service'
import { pgList } from 'src/app/models/pg.type';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private pgServe:PgServiceService,private route:Router, private r:ActivatedRoute) { }
  pgList;
  pgCount;
  mainImage;
  ngOnInit(): void {
    this.pgServe.getAllPg().subscribe(res=>{
      this.pgList=res.result;
      this.pgCount=res.recordCount;
      this.mainImage=res.result[1].photos[0];
    },err=>{
      console.log(err)
    })
    const searchFocus = document.getElementById('search-focus');
const keys = [
  { keyCode: 'AltLeft', isTriggered: false },
  { keyCode: 'ControlLeft', isTriggered: false },
];

window.addEventListener('keydown', (e) => {
  keys.forEach((obj) => {
    if (obj.keyCode === e.code) {
      obj.isTriggered = true;
    }
  });

  const shortcutTriggered = keys.filter((obj) => obj.isTriggered).length === keys.length;

  if (shortcutTriggered) {
    searchFocus.focus();
  }
});

window.addEventListener('keyup', (e) => {
  keys.forEach((obj) => {
    if (obj.keyCode === e.code) {
      obj.isTriggered = false;
    }
  });
});
  }

  CheckIn(id)
  {
    console.log(id);
    this.route.navigate(["check/"+id],{ relativeTo: this.r });
  }

}
