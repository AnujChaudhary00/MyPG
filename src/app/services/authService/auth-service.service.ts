import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user, log } from '../../models/user.type';
import { environment } from '../../../environments/enviroment.dev';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient, public router: Router) { }

  register(data) {
    return this.httpClient.post<any>(`${environment.USER_BASE_URL}/${environment.USER.CREATE_USER}`, data).subscribe((res: any) => {
      localStorage.setItem('token',res.token);
      localStorage.setItem('id',res.id);
      localStorage.setItem('role',res.role);
      if(res.role=='owner')
      {
        this.router.navigate(['dashboard'])
      }else{
        this.router.navigate(['tenant-dashboard'])
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigate(["login"]);
        }
      }
    });
  }

  getRole()
  {
    return localStorage.getItem('role');
  }


  login(data) {
    return this.httpClient.post<any>(`${environment.USER_BASE_URL}/${environment.USER.GET_USER_LOGIN}`, data)
      .subscribe((res: any) => {
        console.log(res);
        if ((res.status == 404 || res.status==401)|| res.status==500){
          console.log(res.status);
          this.router.navigate(['login/'+ res.status]);
        }
        else {
          localStorage.setItem('token',res.token);
          localStorage.setItem('id',res.id);
          localStorage.setItem('role',res.role);
          if(res.role=='owner')
          {
            this.router.navigate(['dashboard'])
          }else{
            this.router.navigate(['user'])
          }
        }
      }, err => { this.handleError(err).subscribe(msg => { alert(msg) }) })
  }

  getToken() {
    
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
 }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('Id');
    this.router.navigate(['/home']);
  }

  getUserProfile(id: any): Observable<any> {
    return this.httpClient.get(`${environment.USER_BASE_URL}/${environment.USER.GET_USER}`, id);
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}

