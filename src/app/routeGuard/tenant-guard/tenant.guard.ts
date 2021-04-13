import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from '../../services/authService/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class TenantGuard implements CanActivate {
  constructor(private _serve:AuthServiceService, private _router:Router){}
  canActivate(): boolean {
    if(this._serve.isLoggedIn())
    {
      if(localStorage.getItem('role')=='owner')
      {
        this._router.navigate(['/home']);
        return false;
      }
      else if(localStorage.getItem('role')=='tenant')
      {
        return true;
      }
    }else{
      this._router.navigate(['/Login'])
      return false;
    }
  }
  
}
