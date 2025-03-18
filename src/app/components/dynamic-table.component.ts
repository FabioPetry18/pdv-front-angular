import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
   <div class="w-full overflow-x-auto">
  <table class="table min-w-max w-full">
    <thead>
      <tr>
        <th *ngIf="image" class="px-4 py-2">Imagem</th>
        <th *ngFor="let column of columns" class="px-4 py-2 whitespace-nowrap">
          {{ column.name }}
        </th>
        <th *ngIf="action" class="px-4 py-2">Ação</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let item of content; trackBy: trackByIndex">
        <td *ngIf="image" class="px-4 py-2">
          <div class="avatar">
            <div class=" rounded-lg w-12 h-12">
              <img [src]="item.imagem" class="rounded-lg" alt="Imagem" *ngIf="item.imagem">
            </div>
          </div>
        </td>
        <td *ngFor="let column of columns" class="px-4 py-2 whitespace-nowrap">
          <ng-container [ngSwitch]="column.entityName">
            <input
              *ngSwitchCase="'status'"
              type="checkbox"
              [checked]="item[column.entityName] === 'Ativo'"
              class="toggle toggle-success"
            />
            <span *ngSwitchDefault>{{ item[column.entityName] }}</span>
          </ng-container>
        </td>
        <td *ngIf="action" class="px-4 py-2 whitespace-nowrap">
          <span class="mr-2 cursor-pointer text-blue-500 hover:underline" (click)="saveChanges(item)">
            Editar
          </span>
          <span class="cursor-pointer text-red-500 hover:underline" (click)="removeChanges(item)">
            Remover
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>

  `
})
export class DynamicTableComponent {
    @Input() content: any[] = []; // Lista de objetos
    @Input() columns: { name: string, entityName: string }[] = []; // Definição das colunas
    @Input() image: boolean = false; // Mostrar ou não imagens
    @Input() action: boolean = false; 
    @Output() updateItem = new EventEmitter<any>();
    @Output() removeItem = new EventEmitter<any>();
  
    saveChanges(item : any) {
        this.updateItem.emit(item); //  Emite evento com o item atualizado
      }
    removeChanges(item : any) {
      this.removeItem.emit(item); //  Emite evento com o item atualizado
    }

      trackByIndex(index: number): number {
        return index;
      }
  }