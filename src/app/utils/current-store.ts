import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LojaService } from '../service/lojaService';
import { Loja, Usuario } from '../interface/login';
import { AuthService } from '../service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class CurrentStoreUtils {
  private lojaSelecionada = new BehaviorSubject<Loja | null>(null);
  lojaSelecionada$ = this.lojaSelecionada.asObservable();
  private lojas = new BehaviorSubject<Loja[]>([]);
  lojas$ = this.lojas.asObservable();

  constructor(private lojaService: LojaService, private authService: AuthService) {}

  async init() {
    const user = await this.authService.getUserData();
    this.definirLojaPadrao(user.id);
  }
  
  
  private definirLojaPadrao(id: number) {
    this.lojaService.getallByProprietario(id).subscribe((lojas) => {
      if (lojas.length > 0) {
        this.lojas.next(lojas);
        this.setLoja(lojas[0]);
      }
    });
  }

  setLoja(loja: Loja) {
    this.lojaSelecionada.next(loja);
  }

  getLojaAtual(): Loja {
    const loja = this.lojaSelecionada.getValue();
    if (!loja) {
      throw new Error("Nenhuma loja foi selecionada!"); 
    }
    return loja;
  }
  getLojas(): Loja[] {
    return this.lojas.getValue();
  }
  
}
