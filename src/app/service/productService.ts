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

  findById(produtoId:number): Observable<any> {
      return this.httpService.get(`/produto/${produtoId}`, new HttpHeaders());
  }
  update( produto: any) : Observable<any> {
    return this.httpService.put(`/produto`, produto);
  }
  save(produto: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('produto', JSON.stringify(produto));
    formData.append('productFile', file); // Arquivo
  
    return this.httpService.post(`/produto`, formData);
  }
}
