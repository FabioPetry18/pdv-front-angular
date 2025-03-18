import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
   <div class="join">
      <div>
        <label class="input join-item">
          <input 
            type="text" 
            [placeholder]="placeholder" 
            [(ngModel)]="searchText"
            (keyup.enter)="onSearch()"
            class="outline-none"
            required
          />
        </label>
      </div>
      <button class="btn btn-neutral join-item" (click)="onSearch()">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
      </button>
  </div>

  `,
})
export class SearchComponent{
  @Input() placeholder: string = 'Pesquisar...'; // Placeholder personalizável
  @Output() search = new EventEmitter<string>(); // Callback para emitir o valor pesquisado
  
  searchText: string = '';

  onSearch() {
      this.search.emit(this.searchText); 
  }
}
