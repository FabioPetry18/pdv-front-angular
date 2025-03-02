import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="overflow-x-auto w-full">
    <table class="table">
        <thead>
        <tr>
            <th *ngIf="image">Imagem</th>
            <th *ngFor="let column of columns" class="px-4 py-2">{{ column.name }}</th>
            <th *ngIf="action">Ação</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let item of content; trackBy: trackByIndex">
            <td *ngIf="image">
                <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                    <img [src]="item.imagem" alt="Imagem" *ngIf="item.imagem">
                    </div>
                </div>
            </td>
            <td *ngFor="let column of columns" class="px-4 py-2">
                <ng-container [ngSwitch]="column.entityName">
                    <input *ngSwitchCase="'status'" type="checkbox"  [checked]="item[column.entityName] === 'Ativo'" class="toggle toggle-success" />
                    <span *ngSwitchDefault>{{ item[column.entityName] }}</span>
                </ng-container>
           </td>
           <td *ngIf="action">
             <span class="mr-2 cursor-pointer" (click)="openModal(item)">Editar</span>
             <span class="cursor-pointer" (click)="openModal(item)">Remover</span>
           </td>
        </tr>

        </tbody>
    </table>
   <!-- Modal com Formulário -->
<dialog #modalElement class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Editar Item</h3>

    <!-- Formulário Gerado Dinamicamente -->
    <form #editForm="ngForm">
        <div *ngFor="let column of columns" class="mb-4">
        <label class="block text-sm font-medium">{{ column.name }}</label>
        <input 
            [(ngModel)]="selectedItem[column.entityName]" 
            name="{{ column.entityName }}" 
            type="text" 
            class="input input-bordered w-full" 
            required>
        </div>
    </form>

    <!-- Ações do Modal -->
    <div class="modal-action">
      <button class="btn btn-success" (click)="saveChanges()">Salvar</button>
      <button class="btn" (click)="closeModal()">Cancelar</button>
    </div>
  </div>
</dialog>

    </div>
  `
})
export class DynamicTableComponent {
    @Input() content: any[] = []; // Lista de objetos
    @Input() columns: { name: string, entityName: string }[] = []; // Definição das colunas
    @Input() image: boolean = false; // Mostrar ou não imagens
    @Input() action: boolean = false; 
    @Output() updateItem = new EventEmitter<any>();
    @ViewChild('modalElement') modalRef!: ElementRef<HTMLDialogElement>;

    selectedItem: any = {};
  
    saveChanges() {
        this.updateItem.emit(this.selectedItem); // ✅ Emite evento com o item atualizado
        this.closeModal();
      }
    

    openModal(item: any) {
        this.selectedItem = { ...item };
        this.modalRef.nativeElement.showModal(); // Abre o modal
    }
  
    closeModal() {
      this.modalRef.nativeElement.close(); // Fecha o modal
    }
      trackByIndex(index: number): number {
        return index;
      }
  }