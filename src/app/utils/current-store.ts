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

  isLojaFechada(loja: Loja): boolean {
    // Verificar se a loja tem horários de funcionamento
    if (!loja.horarios || loja.horarios.length === 0) {
      console.log("Loja sem dados de horário. Considerada fechada.");
      return true; // Se não houver dados de funcionamento, consideramos fechada
    }
  
    // Mapeamento de dias da semana
    const diasSemanaMap: { [key: number]: string } = {
      0: "DOMINGO",
      1: "SEGUNDA",
      2: "TERCA",
      3: "QUARTA",
      4: "QUINTA",
      5: "SEXTA",
      6: "SABADO"
    };
  
    const hoje = new Date();
    const diaSemanaAtual = diasSemanaMap[hoje.getDay()];
    console.log("Dia da semana atual:", diaSemanaAtual);
  
    // Encontrar o funcionamento do dia atual
    const funcionamentoHoje = loja.horarios.find(f => f.diaSemana === diaSemanaAtual);
    console.log("Funcionamento hoje:", funcionamentoHoje);
  
    if (!funcionamentoHoje) {
      console.log("Não encontrado horário para hoje. Loja fechada.");
      return true; // Se não encontrar, a loja está fechada
    }
  
    const horaAtual = hoje.toTimeString().split(" ")[0]; // "HH:MM:SS"
    console.log("Hora atual:", horaAtual);
  
    const isFechada = horaAtual < funcionamentoHoje.abertura || horaAtual > funcionamentoHoje.fechamento;
    console.log("A loja está fechada?", isFechada);
  
    return isFechada;
  }
}  
