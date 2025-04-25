import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { DynamicTableComponent } from '../../../components/dynamic-table.component';
import { NewAdicionalModalComponent } from "../../../components/new-adicional-modal.component";
import { NewProductModalComponent } from '../../../components/new-product-modal.component';
import { PaginationComponent } from '../../../components/paginator.component';
import { SearchComponent } from '../../../components/search.component';
import { Adicional, PageResponse, Produto } from '../../../interface/produto';
import { ProductService } from '../../../service/productService';
import { CurrentStoreUtils } from '../../../utils/current-store';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, DynamicTableComponent, PaginationComponent, SearchComponent, NewProductModalComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(private productService:ProductService, private storeUtils: CurrentStoreUtils, private route: ActivatedRoute) { }
  produtos : Array<Produto> = [];
  isLastPage: boolean = false;
  currentPage: number = 1;
  @ViewChild(NewProductModalComponent) newProductModal!: NewProductModalComponent;

  edit: boolean = true;
  adicionais: Adicional[] = [];
  imageEdit: string | ArrayBuffer | null = null // para exibir na preview
  selectedFile: File | null = null;
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
 

  /*  Tabela  */

  //acao de remover na tabela
  onRemoveItem(event : Produto){ 
    console.log('Item removido:', event);
  }
  onUpdateItem(event : Produto){ 
    this.newProductModal.openModal(event);
  }
  onCreateItem(){ 
    this.newProductModal.openModal();
  }


  onUpsertProduct(event: { product: Produto; file: File | null }) {
    const produto = event.product;
    const file = event.file;
    this.selectedFile = file;
    this.updateProduct(produto);
  }

  updateProduct(produto : Produto){
    if(produto){
      this.saveProduct(produto);
    } else {
      this.productService.update(produto).subscribe({
        next: (response: Produto) => {
          console.log('Produto atualizado com sucesso:', response);
         this.newProductModal.closeModal();
          this.paginator(this.currentPage);
        },
        error: (error) => {
          console.error('Erro ao atualizar o produto:', error);
        }
      });
    }
  }
  saveProduct(produto : Produto, image: File | null = null){
    this.productService.save(produto, this.selectedFile!).subscribe({
      next: (response: Produto) => {
        console.log('Produto salvo com sucesso:', response);
        this.newProductModal.closeModal();
        this.paginator(this.currentPage);
      },
      error: (error) => {
        console.error('Erro ao salvo o produto:', error);
      }
    });
  }
}
