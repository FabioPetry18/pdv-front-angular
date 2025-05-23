import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Loja } from '../interface/login';
import { CurrentStoreUtils } from '../utils/current-store';

@Component({
  selector: 'app-store-combo-box',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="w-full">
  <button 
    class="flex items-center justify-evenly rounded-sm cursor-pointer hover:bg-base-200 w-full" 
    (click)="toggleDropdown()" 
    [disabled]="isLoading"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" stroke-width="1">
      <path d="M3 21l18 0"></path>
      <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4"></path>
      <path d="M5 21l0 -10.15"></path>
      <path d="M19 21l0 -10.15"></path>
      <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4"></path>
    </svg>
    <span class="text-base-content">
   {{ isLoading ? 'Carregando...' : selectedStore.nome }}
    </span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" stroke-width="1">
      <path d="M6 9l6 6l6 -6"></path>
    </svg>
  </button>

  <div *ngIf="isDropdownOpen" class="absolute w-full min-w-[200px] z-10 mt-1 bg-base-200 border  rounded-sm shadow-lg border-gray-300">
    <!-- Exibir "Carregando..." se ainda estiver carregando -->
    <ng-container *ngIf="isLoading">
      <div class="flex items-center p-2">
        <span class="text-base-content">Carregando...</span>
      </div>
    </ng-container>

    <!-- Exibir lista de lojas quando carregado -->
    <ng-container *ngIf="!isLoading">
      <div *ngFor="let store of stores; let last = last" (click)="selectStore(store)">
        <div class="flex items-center justify-between px-4 hover:bg-gray-100 p-4">
          <div class="flex gap-2 items-center justify-center">
            <span class="text-base-content">{{ store.nome }}</span>
            <div class="status" [ngClass]="lojaFechada(store) ?  'status-error' : 'status-success'"></div>
            </div>
          <div class="badge badge-soft badge-primary cursor-pointer">Editar</div>
        </div>
        <!-- Só exibe o divider se NÃO for o último item -->
        <div *ngIf="!last" class="divider m-0 p-0"></div>
      </div>
    </ng-container>


  </div>
</div>

  `
})
export class StoreComboBoxComponent implements OnInit {
  stores: Loja[] = [];
  @Output() selectedStoreChange = new EventEmitter<Loja>();
  isClosed = true;
  selectedStore: Loja = new Loja();
  isDropdownOpen = false;
  isLoading = true;
  constructor(private currentStore: CurrentStoreUtils) {}
  ngOnInit() {
    console.log("Inicializando - isLoading:", this.isLoading);
    
    this.currentStore.lojas$.subscribe(stores => {
      console.log("Dados recebidos:", stores);
  
      this.stores = stores;
  
      if (stores.length > 0) {
        this.selectedStore = stores[0];
        this.isLoading = false; 
        console.log("Fechando - isLoading:", this.isLoading);
      }
    });
  }

  lojaFechada(store: Loja) {
    return this.currentStore.isLojaFechada(store);
  }
  
  selectStore(store: Loja) {
    this.selectedStore = store;
    this.selectedStoreChange.emit(store);
    this.isDropdownOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
