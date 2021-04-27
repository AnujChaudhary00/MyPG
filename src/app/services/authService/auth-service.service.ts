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
        this.router.navigate(['dashboard']);
        location.reload();
      }else{
        this.router.navigate(['tenant-dashboard']);
        location.reload();
      }
    }, err => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          alert("You already have account with us. Please Login to Continue");
        }
      }
    });
  }


  phoneverify(phoneno)
  {
    return this.httpClient.get<any>(`${environment.USER_BASE_URL}/${environment.PHONE.SEND_CODE}`,{params:{'phoneno':phoneno}})
  }

  getCodeVerify(code,phoneno)
  {
    return this.httpClient.get<any>(`${environment.USER_BASE_URL}/${environment.PHONE.CHECK_CODE}`,{params:{'phoneno':phoneno,'code':code}})
  }

  getRole()
  {
    return localStorage.getItem('role');
  }


  login(data) {
    return this.httpClient.post<any>(`${environment.USER_BASE_URL}/${environment.USER.GET_USER_LOGIN}`, data)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status == 404){
         alert("Email not found");
          this.router.navigate(['login/'+ res.status]);
        }
        else if(res.status==401 || res.status==500)
        {
          alert("Invalid Passowrd");
        }
        else {
          localStorage.setItem('token',res.token);
          localStorage.setItem('id',res.id);
          localStorage.setItem('role',res.role);
          if(res.role=='owner')
          {
            this.router.navigate(['dashboard']);
            setTimeout(function (){
              location.reload();
            },1000);
          }else{
            this.router.navigate(['tenant-dashboard']);
            setTimeout(function (){
              location.reload();
            },1000);
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
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('pgid');
    this.router.navigate(['/home']);
  }

  getUserProfile(id: any): Observable<any> {
    return this.httpClient.get(`${environment.USER_BASE_URL}/${environment.USER.GET_USER}`, id);
  }

  forgotPassword(data):Observable<any>
  {
    return this.httpClient.get<any>(`${environment.USER_BASE_URL}/${environment.USER.FORGOT}/${data}`);
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

