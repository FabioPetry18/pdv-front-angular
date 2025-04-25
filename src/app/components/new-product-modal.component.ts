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
  selector: 'app-new-product-modal',
  standalone: true,
  imports: [CommonModule, SearchComponent, FormsModule],
  template: `
      <dialog #modalElement class="modal">
      <div class="modal-box max-w-4xl min-h-[35rem] h-auto bg-base-200 border border-base-300 shadow-lg">
        
        <!-- Abas -->
        <div class="tabs tabs-lift bg-base-200">
          <a 
            class="tab text-base-content" 
            [class.tab-active]="activeTab === 'produto'"
            (click)="setActiveTab('produto')">
            Produto
          </a>
          <a 
            class="tab text-base-content" 
            [class.tab-active]="activeTab === 'adicional'"
            (click)="setActiveTab('adicional')">
            Adicional
          </a>
        </div>

        <!-- Conteúdo das Abas -->
        <div *ngIf="activeTab === 'produto'" class="flex max-h-[30rem] gap-4 p-3 bg-base-200 border border-base-300 rounded-lg">
          
          <!-- Formulário -->
          <div class="w-1/2">
            <fieldset class="fieldset">
              <input type="file" (change)="onFileSelected($event)" class="file-input file-input-bordered w-full bg-base-200 text-base-content border-base-300" />
              <label class="fieldset-label text-base-content">Tamanho máximo 2MB</label>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend text-base-content">Título</legend>
              <input #titulo="ngModel"
              type="text" class="input input-bordered w-full bg-base-200 text-base-content border-base-300" [(ngModel)]="selectedItem.titulo" required />
              <div *ngIf="titulo.invalid && titulo.touched"  class="validator-hint text-error">Campo obrigatório!</div>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend text-base-content">Descrição</legend>
              <textarea  #descricao="ngModel"
              class="textarea textarea-bordered h-24 w-full bg-base-200 text-base-content border-base-300" [(ngModel)]="selectedItem.descricao"></textarea>
              <div *ngIf="descricao.invalid && descricao.touched" class="fieldset-label text-base-content">Opcional</div>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend text-base-content">Tag</legend>
              <input #titulo="ngModel"
              type="text" class="input input-bordered w-full bg-base-200 text-base-content border-base-300" [(ngModel)]="selectedItem.tag" required />
              <div *ngIf="descricao.invalid && descricao.touched" class="fieldset-label text-base-content">Opcional</div>
            </fieldset>

            <fieldset class="fieldset">
              <legend class="fieldset-legend text-base-content">Valor</legend>
              <input   #valor="ngModel"
              type="number" class="input input-bordered w-full bg-base-200 text-base-content border-base-300" [(ngModel)]="selectedItem.valor" required />
              <div *ngIf="valor.invalid && valor.touched" class="validator-hint text-error">Campo obrigatório!</div>
            </fieldset>
          </div>

          <!-- Divider -->
          <div class="divider divider-horizontal border-base-300"></div>

          <!-- Card de Informações -->
          <div class="w-1/2 bg-base-200 p-4 rounded-lg shadow-lg border border-base-300">
            <figure class="w-full">
              <img  
                [src]="edit ? imageEdit ?  imageEdit : selectedItem.imagem  : imageEdit ?  imageEdit :  'https://placehold.co/200x200'" 
                alt="Imagem do Produto" 
                class="w-full h-50 object-cover rounded-lg"
              >
            </figure>        
            <div class="mt-4">
              <h3 class="text-lg font-bold text-base-content">{{ selectedItem.titulo }}</h3>
              <p class="text-base-content">{{ selectedItem.descricao }}</p>
              <p class="text-lg font-semibold text-base-content mt-2">R$ {{ selectedItem.valor }}</p>
            </div>
          </div>

        </div>
        <!-- Conteúdo da Aba "Adicional" -->
        <div *ngIf="activeTab === 'adicional'" class="p-4 bg-base-200 h-[25rem] overflow-y-auto border border-base-300 rounded-lg">
          <div class="flex w-full items-center justify-center mb-4">
            <app-search placeholder="Digite uma tag ou nome" (search)="onSearchResultModal($event)"></app-search>
          </div>

          <div class="flex flex-row justify-between mb-3" *ngFor="let adicional of adicionais" >
            <div class="flex flex-row gap-2">
              <p  class="text-base-content"> {{ adicional.titulo }}</p>
              <div class="badge badge-outline badge-primary">{{ adicional.tag}}</div>
            </div>
            <input type="checkbox" (change)="onCheckboxChange($event, adicional)" [checked]="adicional.produtoid != null" class="toggle toggle-error" />
          </div>
        </div>

        <!-- Ações do Modal -->
        <div   class="modal-action">
            <button class="btn btn-neutral" (click)="closeModal()">Cancelar</button>
            <button class="btn btn-primary" (click)="updateProduct()">Salvar</button>
        </div>

      </div>
    </dialog>
  `,
})
export class NewProductModalComponent {
    @ViewChild('modalElement') modalRef!: ElementRef<HTMLDialogElement>;
    @ViewChild('AdicionalElement') modalRefAdicional!: ElementRef<HTMLDialogElement>;
    @Output() upsertProduct = new EventEmitter<{ product: Produto, file: File | null }>();
    selectedItem: Produto = new Produto();
    selectedFile: File | null = null;
    activeTab: string = 'produto'; 
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
        this.selectedFile = null; // Remove o arquivo selecionado
        this.imageEdit = null; // Limpa a imagem editada (caso esteja usando)
        this.activeTab = 'produto'; // Retorna para a aba inicial
        this.adicionais = []; // Limpa a lista de adicionais
        this.edit = false
      }
    
    setActiveTab(tab: string) {
        this.activeTab = tab; 
      }

    updateProduct(){
        this.selectedItem.loja = this.storeUtils.getLojaAtual();
        this.upsertProduct.emit({ product: this.selectedItem, file: this.selectedFile ?? null });
    }

    findProdutoById(produtoid:number) {
    this.productService.findById(produtoid).pipe(first()).subscribe({
        next: (response: Produto) => {
        this.selectedItem = response;
        this.findAdicionais(response.id)
        
        }
    })
    }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageEdit = e.target?.result as string;
    };
    reader.readAsDataURL(file);
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
