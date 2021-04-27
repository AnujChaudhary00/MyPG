import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../../environments/enviroment.dev';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PgServiceService {

  public grivence$: BehaviorSubject<number>= new BehaviorSubject(0);

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient, public router: Router) { }

  getTicketCount()
  {
     this.httpClient.get<any>(`${environment.TICKET_BASE_URL}/${environment.TICKET.GET_TICKET}/`+localStorage.getItem('id')).subscribe(res=>{
       this.grivence$.next(res.count);
     },error=>{
       console.log(error);
     });
  }

  updateTicket()
  {
    return this.httpClient.get<any>(`${environment.TICKET_BASE_URL}/${environment.TICKET.UPDATE_TICKET}/`+localStorage.getItem('id'));
  }
  
  AddPg(data) {
    return this.httpClient.post<any>(`${environment.PG_BASE_URL}/${environment.PG.CREATE_PG}`, data);
  }

  getPgDetail(id: any): Observable<any> {
    return this.httpClient.get(`${environment.PG_BASE_URL}/${environment.PG.GET_PG}/${id}`);
  }
  getPg(id: any): Observable<any> {
    return this.httpClient.get(`${environment.PG_BASE_URL}/pgDetail/${id}`);
  }

  getAllPg(): Observable<any> {
    return this.httpClient.get(`${environment.PG_BASE_URL}/${environment.PG.GET_ALL_PG}`);
  }

  deletePg(id: any): Observable<any> {
    return this.httpClient.delete(`${environment.PG_BASE_URL}/${environment.PG.DELETE_PG}/${id}`);
  } 

  updatePg(id,data)
  {
    return this.httpClient.put<any>(`${environment.PG_BASE_URL}/${environment.PG.UPDATE_PG}/`+id,data);
  }

  searchPg(data)
  {
    return this.httpClient.get<any>(`${environment.PG_BASE_URL}/${environment.PG.PG_BY_LOCATION}/`+data);
  }

  getStates()
  {
    return this.httpClient.get<any>('https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions',{})
  }

  createTicket(data:any,id)
  {
    console.log(data);
    return this.httpClient.post<any>(`${environment.TICKET_BASE_URL}/${environment.TICKET.CREATE_TICKET}/`+id,data);
  }

  getTicket(ownerid)
  {
    return this.httpClient.get<any>(`${environment.TICKET_BASE_URL}/${environment.TICKET.GET_TICKET}/`+ownerid);
  }

  getMyTicket(id)
  {
    return this.httpClient.get<any>(`${environment.TICKET_BASE_URL}/${environment.TICKET.MY_TICKET}/`+id);
  }

}
