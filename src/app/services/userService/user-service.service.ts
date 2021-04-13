import { Injectable } from '@angular/core';
import {environment} from '../../../environments/enviroment.dev';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient, public router: Router) { }

  getUserProfile(id)
  {
    return this.httpClient.get<any>(`${environment.USER_BASE_URL}/${environment.USER.GET_USER}/`+id);
  }

  updateUser(id,data)
  {
    return this.httpClient.put<any>(`${environment.USER_BASE_URL}/${environment.USER.UPDATE_USER}/`+id,data);
  }

}
