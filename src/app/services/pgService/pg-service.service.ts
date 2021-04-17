import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '../../../environments/enviroment.dev';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PgServiceService {


  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient, public router: Router) { }

  
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

  getStates()
  {
    return this.httpClient.get<any>('https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions',{})
  }

}
