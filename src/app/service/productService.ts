import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { Observable } from "rxjs";
import { HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private httpService: HttpService) {}

  paginator(page: number, lojaId: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', 10);
      return this.httpService.get(`/produto/paginator/${lojaId}`, new HttpHeaders(), params);
  }
  update( login: any,id: number) : Observable<any> {
    return this.httpService.put(`/login/${id}`, login);
  }
}
