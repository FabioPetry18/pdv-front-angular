import { Injectable } from "@angular/core";
import { HttpService } from './http.service';
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LojaService {
  constructor(private httpService: HttpService) {}

  add(data: any, idProprietario: number): Observable<any> {
    return this.httpService.post(`/loja/${idProprietario}`, data);
  }

  
  getallByProprietario(idProprietario: number): Observable<any> {
    return this.httpService.get(`/loja/${idProprietario}`);
  }
}
