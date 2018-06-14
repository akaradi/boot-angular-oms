import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: "root"
})
export class HttpAPIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("inside interceptor");
    const apiReq = req.clone({ url: `http://localhost:8080/${req.url}` });
    return next.handle(apiReq);
  }
}