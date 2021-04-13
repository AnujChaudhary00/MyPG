import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from '../../services/authService/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
  constructor(private _serve:AuthServiceService, private _router:Router){}
  canActivate():boolean{
    if(this._serve.isLoggedIn())
    {
      if(localStorage.getItem('role')=='owner')
      {
        return true;
      }
      else if(localStorage.getItem('role')=='tenant')
      {
        this._router.navigate(['/tenant']);
        return false;
      }
    }else{
      this._router.navigate(['/Login'])
      return false;
    }
  }
  
}
