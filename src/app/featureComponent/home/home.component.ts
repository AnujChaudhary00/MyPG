import { Component, OnInit,HostListener } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
 
  }

  @HostListener('window:scroll', ['$event'])

  onScroll(event)
  {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        document.getElementById("toptexts2").style.display = "";
    } else {
        document.getElementById("toptexts2").style.display = "none";
    }
  }

}
