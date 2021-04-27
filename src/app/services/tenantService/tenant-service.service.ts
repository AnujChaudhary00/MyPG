import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../../environments/enviroment.dev';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantServiceService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient, public router: Router) { }

  public dashboard:BehaviorSubject<boolean>= new  BehaviorSubject(true);

  bookPg(data) {
    return this.httpClient.post<any>(`${environment.TENANT_BASE_URL}/${environment.TENANT.BOOK_PG}`, data);
  }

  myBookings(id: any): Observable<any> {
    return this.httpClient.get(`${environment.TENANT_BASE_URL}/${environment.TENANT.MY_BOOKINGS}/${id}`);
  }
  cancelBooking(id: any,pgid:any): Observable<any> {
    return this.httpClient.delete(`${environment.TENANT_BASE_URL}/${environment.TENANT.CANCEL_BOOKING}`,{params:{'userid':id,'pgid':pgid}});
  }

  getMyTenant(ownerid:any): Observable<any> {
    return this.httpClient.get(`${environment.TENANT_BASE_URL}/${environment.TENANT.GET_MY_TENANT}/${ownerid}`);
  }

}
