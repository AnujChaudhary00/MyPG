import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from './../services/authService/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGuardGuard implements CanActivate {
  constructor(private _serve:AuthServiceService, private _router:Router){}
  canActivate():boolean{
      if(this._serve.isLoggedIn())
      {
        return true
      }else{
        this._router.navigate(['/login'])
        return false
      }
  }
  
}
