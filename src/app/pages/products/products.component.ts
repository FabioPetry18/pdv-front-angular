import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, Loja, Usuario } from '../../interface/login';
import { LoginService } from '../../service/loginService';
import { DynamicTableComponent } from "../../components/dynamic-table.component";
import { ProductService } from '../../service/productService';
import { Adicional, PageResponse, Produto } from '../../interface/produto';
import { PaginationComponent } from '../../components/paginator.component';
import { SearchComponent } from "../../components/search.component";
import { AdicionalService } from '../../service/adicionalService';
import { CurrentStoreUtils } from '../../utils/current-store';


@Component({
  selector: 'app-first-acess',
  standalone: true,
  imports: [FormsModule, CommonModule, DynamicTableComponent, PaginationComponent, SearchComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent  {
  constructor(private productService:ProductService, private adicionalService: AdicionalService, private storeUtils: CurrentStoreUtils) { }
  produtos : Array<Produto> = [];
  isLastPage: boolean = false;
  currentPage: number = 1;
  @ViewChild('modalElement') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('AdicionalElement') modalRefAdicional!: ElementRef<HTMLDialogElement>;

  selectedItem: Produto = new Produto();
  adicionais: Adicional[] = [];
  activeTab: string = 'produto'; // Aba inicial
  imageEdit: string | ArrayBuffer | null = null
  columns = [
    { name: 'Titulo', entityName: 'titulo' },
    { name: 'Descrição', entityName: 'descricao' },
    { name: 'Valor', entityName: 'valor' },
    { name: 'Status', entityName: 'status' }
  ];



  /* Componente Pesquisa produto  */
  onSearchResult(searchTerm: string) {
    console.log('Pesquisa realizada:', searchTerm);
    this.paginator(this.currentPage);
  }

  /*  Paginação */
  onPageChange(page: number) {
    this.paginator(page);
  }
  paginator(page: number) {
    this.productService.paginator(page,this.storeUtils.getLojaAtual().id).pipe(first()).subscribe({
      next: (response: PageResponse<Produto>) => {
        this.produtos = response.content;
        this.isLastPage = response.last;
      }
    })
  }
 
  findAdicionais(item: any, param?:string) {
    this.adicionalService.findall(item.id, this.storeUtils.getLojaAtual().id, param).pipe(first()).subscribe({  
      next: (response: Adicional[]) => {
        this.adicionais = response;
      }
    })
  }
  findProdutoById(produtoid:number) {
    this.productService.findById(produtoid).pipe(first()).subscribe({
      next: (response: Produto) => {
        this.selectedItem = response;
      }
    })
  }
  /*  Tabela  */

  //acao de remover na tabela
  onRemoveItem(event : Produto){ 
    this.selectedItem = event;
    this.openModal()
  }
  //editar  na tabela
  onUpdateItem(event : Produto ){
    this.selectedItem = event;
    this.openModal()
  }

  onCreateItem(){
    this.selectedItem = new Produto();
    this.selectedItem.loja = this.storeUtils.getLojaAtual();
    this.adicionais = [];
    this.imageEdit = null;
    this.openModal()
  }

  
  onCreateAdicional(){
    this.selectedItem = new Produto();
    this.selectedItem.loja = this.storeUtils.getLojaAtual();
    this.adicionais = [];
    this.imageEdit = null;
    this.openModal()
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageEdit = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
  
  /* MODAL */
  openModal() {
    this.activeTab = 'produto'; // Sempre abre na aba "Produto"
    if(this.selectedItem.id) {
      this.findProdutoById(this.selectedItem.id);
      this.findAdicionais(this.selectedItem);
    } else {
      this.selectedItem.id = 0;
      this.findAdicionais(this.selectedItem);
    }
    this.modalRef.nativeElement.showModal(); // Abre o modal
  }

  closeModal() {
    this.modalRef.nativeElement.close(); // Fecha o modal
  }

  setActiveTab(tab: string) {
    this.activeTab = tab; // Alterna entre as abas
  }

  updateProduct(){
    console.log(this.selectedItem);
    if(this.selectedItem.id == 0){
      this.saveProduct();
    } else {
      this.productService.update(this.selectedItem).subscribe({
        next: (response: Produto) => {
          console.log('Produto atualizado com sucesso:', response);
          this.closeModal();
          this.paginator(this.currentPage);
        },
        error: (error) => {
          console.error('Erro ao atualizar o produto:', error);
        }
      });
    }
  }
  saveProduct(){
    this.productService.save(this.selectedItem).subscribe({
      next: (response: Produto) => {
        console.log('Produto salvo com sucesso:', response);
        this.closeModal();
        this.paginator(this.currentPage);
      },
      error: (error) => {
        console.error('Erro ao salvo o produto:', error);
      }
    });
  }

  onSearchResultModal(searchTerm: string) {
    console.log('Pesquisa realizada modal:', searchTerm);
    this.findAdicionais(this.selectedItem, searchTerm);
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
