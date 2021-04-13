import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../services/authService/auth-service.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth:AuthServiceService) { }

  isLoggedIn=false;
  ngOnInit(): void {
    if(localStorage.getItem('token'))
    {
      this.isLoggedIn=true;
    }
    
  }

}
