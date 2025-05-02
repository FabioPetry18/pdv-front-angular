import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProprietarioDTO } from '../interface/proprietario';

@Injectable({
  providedIn: 'root'
})
export class ProprietarioService {
 constructor(private httpService: HttpService) {}

 cadastrar(proprietario: ProprietarioDTO): Observable<ProprietarioDTO> {
    return this.httpService.post(`/proprietario`, proprietario);
  }

  obterPorId(id: number): Observable<ProprietarioDTO> {
    return this.httpService.get<ProprietarioDTO>(`/proprietario/${id}`);
  }

  verificarStatus(id: number): Observable<ProprietarioDTO> {
    return this.httpService.get<ProprietarioDTO>(`/proprietario/${id}`);
  }
}