import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class=" shadow-md p-3 w-auto">
    
    <h4 class="font-medium">Pedido Nº {{objeto?.npedido}}</h4>
    
    @for (item of objeto?.itens; track item.nome) {
      <div class="flex gap-1 ">
        <p >{{item.quantidade + "x " + item.nome + " - " + item.valor}} </p>
        <span  (click)="toggleExpand()" class="cursor-pointer flex flex-row items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-sm">{{ isExpanded ? '-' : '+'}}</span>
      </div>
      <div
        *ngIf="isExpanded"
        class="mt-4 p-4 bg-gray-100 rounded-md shadow-md"
      >
        <p class="text-gray-700">
        @for (adicional of item?.adicionais; track adicional.nome) {
          {{adicional.quantidade + "x " + adicional.nome + " - " + adicional.valor}}
        }
        </p>
      </div>
    }
    <p>Endereço: {{objeto?.endereco}}</p>
    <p>Valor: {{objeto?.valorTotal}}</p>
    <div class="flex gap-2 pt-3">
      <button type="button" class="p-2 text-textbase rounded-sm bg-accept">Aceitar</button>
      <button type="button" class="p-2 text-textbase rounded-sm bg-reject">Rejeitar</button>
    </div>

  </div>
  `,
})
export class ItemComponent {
  @Input() objeto: any;

  isExpanded = false;
  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
 
}
