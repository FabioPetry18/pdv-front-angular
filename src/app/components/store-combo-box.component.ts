import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Loja } from '../interface/login';

@Component({
  selector: 'app-store-combo-box',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <button class="flex  items-center p-2 border rounded-sm cursor-pointer hover:bg-base-200 w-full" (click)="toggleDropdown()">
        <span class="text-base-content">{{ selectedStore ? selectedStore.nome : 'Selecione uma loja' }}</span>
      </button>

      <div *ngIf="isDropdownOpen" class="absolute z-10 w-full mt-1 bg-base-200 border border-gray-300 rounded-sm shadow-lg">
        <div *ngFor="let store of stores" (click)="selectStore(store)" class="flex items-center p-2 cursor-pointer hover:bg-gray-100">
          <span class="text-base-content">{{ store.nome }}</span>
        </div>
      </div>
    </div>
  `
})
export class StoreComboBoxComponent implements OnInit {
  @Input() stores: Loja[] = [];
  @Output() selectedStoreChange = new EventEmitter<Loja>();

  selectedStore: Loja = new Loja();
  isDropdownOpen = false;

  ngOnInit() {
    if (this.stores && this.stores.length > 0) {
      this.selectStore(this.stores[0]);
    }
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
