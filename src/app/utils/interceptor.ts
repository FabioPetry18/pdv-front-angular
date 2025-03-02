import { HttpInterceptorFn } from "@angular/common/http";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable()
export class SampleInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');

    
    // Logando a requisição e o header
    console.log('Request URL:', req.url);
    console.log('Request Headers:', req.headers);

    // Aqui você pode verificar o conteúdo do Authorization header
    if (req.headers.has('Authorization')) {
      console.log('Authorization Header:', req.headers.get('Authorization'));
    }
     if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}
