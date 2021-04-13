import { Injectable,Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthServiceService} from '../services/authService/auth-service.service'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private injector:Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let authService=this.injector.get(AuthServiceService)
    let tokenizedReq=request.clone({
    setHeaders:{
      Authorization:`Bearer ${authService.getToken()}`
    }
  })
  return next.handle(tokenizedReq);
}
}
