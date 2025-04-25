import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { Observable } from "rxjs";
import { HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AdicionalService {
  constructor(private httpService: HttpService) {}

  findall(produtoId: number, lojaId: number, param: string =''): Observable<any> {
    const params = new HttpParams()
    .set('param', param)
      return this.httpService.get(`/adicional/${lojaId}/${produtoId}/allByProduct`, new HttpHeaders(),params);
  }
  update( login: any) : Observable<any> {
    return this.httpService.put(`/adicional`, login);
  }

  paginator(page: number, lojaId: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', 10);
      return this.httpService.get(`/adicional/${lojaId}/paginator`, new HttpHeaders(), params);
  }

}
