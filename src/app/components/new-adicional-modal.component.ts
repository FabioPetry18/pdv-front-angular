import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, first } from 'rxjs';
import { CurrentStoreUtils } from '../utils/current-store';
import { SearchComponent } from "./search.component";
import { Adicional, Produto } from '../interface/produto';
import { ProductService } from '../service/productService';
import { AdicionalService } from '../service/adicionalService';

@Component({
  selector: 'app-new-adicional-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
      <dialog #modalElement class="modal">
      <div class="modal-box max-w-4xl min-h-[35rem] h-auto bg-base-200 border border-base-300 shadow-lg">
        <!-- Conteúdo das Abas -->
        <div  class="flex max-h-[30rem] gap-4 p-3 bg-base-200 border border-base-300 rounded-lg">
          
          <!-- Formulário -->
          <div class="w-full">
            <fieldset class="fieldset">
              <legend class="fieldset-legend text-base-content">Título</legend>
              <input #titulo="ngModel"
              type="text" class="input input-bordered w-full bg-base-200 text-base-content border-base-300" [(ngModel)]="selectedItem.titulo" required />
              <div *ngIf="titulo.invalid && titulo.touched"  class="validator-hint text-error">Campo obrigatório!</div>
            </fieldset>
            
            <fieldset class="fieldset">
              <legend class="fieldset-legend text-base-content">Tag</legend>
              <input #titulo="ngModel"
              type="text" class="input input-bordered w-full bg-base-200 text-base-content border-base-300" [(ngModel)]="selectedItem.tag" required />
              <div *ngIf="descricao.invalid && descricao.touched" class="fieldset-label text-base-content">Opcional</div>
            </fieldset>
            
            <fieldset class="fieldset">
              <legend class="fieldset-legend text-base-content">Descrição</legend>
              <textarea  #descricao="ngModel"
              class="textarea textarea-bordered h-24 w-full bg-base-200 text-base-content border-base-300" [(ngModel)]="selectedItem.descricao"></textarea>
              <div *ngIf="descricao.invalid && descricao.touched" class="fieldset-label text-base-content">Opcional</div>
            </fieldset>


            <fieldset class="fieldset">
              <legend class="fieldset-legend text-base-content">Valor</legend>
              <input   #valor="ngModel"
              type="number" class="input input-bordered w-full bg-base-200 text-base-content border-base-300" [(ngModel)]="selectedItem.valor" required />
              <div *ngIf="valor.invalid && valor.touched" class="validator-hint text-error">Campo obrigatório!</div>
            </fieldset>
          </div>
        </div>
        <div   class="modal-action">
            <button class="btn btn-neutral" (click)="closeModal()">Cancelar</button>
            <button class="btn btn-primary" (click)="updateProduct()">Salvar</button>
        </div>

      </div>
    </dialog>
  `,
})
export class NewAdicionalModalComponent {
    @ViewChild('modalElement') modalRef!: ElementRef<HTMLDialogElement>;
    @ViewChild('AdicionalElement') modalRefAdicional!: ElementRef<HTMLDialogElement>;
    @Output() upsertAdicional = new EventEmitter<Adicional>();
    selectedItem: Produto = new Produto();
    edit: boolean = false;
    imageEdit: string | ArrayBuffer | null = null // para exibir na preview
    constructor(private storeUtils: CurrentStoreUtils,private adicionalService: AdicionalService, private productService:ProductService){}
    adicionais: Adicional[] = [];

    closeModal() {
        this.resetValues()
        this.modalRef.nativeElement.close(); // Fecha o modal
      }
    openModal(produto?:Produto) {
    if(produto){ //Se for edicao
        this.findProdutoById(produto.id!);
        this.selectedItem = produto
        this.edit = true
    } else {
        this.findAdicionais();
        this.edit = false
    }
    this.modalRef.nativeElement.showModal(); // Abre o modal
    }
    resetValues() {
        this.selectedItem = new Produto(); // Reseta o objeto Produto
        this.imageEdit = null; // Limpa a imagem editada (caso esteja usando)
        this.adicionais = []; // Limpa a lista de adicionais
        this.edit = false
      }
    


    updateProduct(){
        this.selectedItem.loja = this.storeUtils.getLojaAtual();
        this.upsertAdicional.emit(this.selectedItem);
    }

    findProdutoById(produtoid:number) {
    this.productService.findById(produtoid).pipe(first()).subscribe({
        next: (response: Produto) => {
        this.selectedItem = response;
        this.findAdicionais(response.id)
        
        }
    })
    }


  findAdicionais(item: number = 0, param?:string) {
    this.adicionalService.findall(item, this.storeUtils.getLojaAtual().id, param).pipe(first()).subscribe({  
      next: (response: Adicional[]) => {
        this.adicionais = response;
      }
    })
  }
 onSearchResultModal(searchTerm: string) {
     console.log('Pesquisa realizada modal:', searchTerm);
     this.findAdicionais(this.selectedItem.id, searchTerm);
   }

   onCheckboxChange(event: any, adicional: Adicional): void {
    const checked = event.currentTarget.checked
    if(checked) {
      this.selectedItem.adicionais.push(adicional)
      adicional.produtoid = this.selectedItem.id;
    }else {
      this.selectedItem.adicionais = this.selectedItem.adicionais.filter(ad => ad.id != adicional.id)
    }
  }
    
  }
