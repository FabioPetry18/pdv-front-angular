import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl: string = 'http://192.168.0.37:8081';

  constructor(private http: HttpClient) {}

  post<T>(url: string, body: any, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body, { headers, params });
  }
  
  get<T>(url: string, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`, { headers,params });
  }

  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${url}`, body, { headers });
  }
}
