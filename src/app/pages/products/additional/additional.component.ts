import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { DynamicTableComponent } from '../../../components/dynamic-table.component';
import { PaginationComponent } from '../../../components/paginator.component';
import { SearchComponent } from '../../../components/search.component';
import { Produto, Adicional, PageResponse } from '../../../interface/produto';
import { AdicionalService } from '../../../service/adicionalService';
import { ProductService } from '../../../service/productService';
import { CurrentStoreUtils } from '../../../utils/current-store';
import { NewAdicionalModalComponent } from '../../../components/new-adicional-modal.component';



@Component({
  selector: 'app-additional',
  standalone: true,
  imports: [FormsModule, CommonModule, DynamicTableComponent, PaginationComponent, SearchComponent, NewAdicionalModalComponent ],
  templateUrl: './additional.component.html',
  styleUrl: './additional.component.css'
})
export class AdditionalComponent  {
  constructor( private adicionalService: AdicionalService, private storeUtils: CurrentStoreUtils, private route: ActivatedRoute) { }


  adicional : Array<Adicional> = [];
  isLastPage: boolean = false;
  currentPage: number = 1;
  edit: boolean = true;
  selectedItem: Produto = new Produto();
  adicionais: Adicional[] = [];
  activeTab: string = 'produto'; // Aba inicial
  imageEdit: string | ArrayBuffer | null = null // para exibir na preview
  selectedFile: File | null = null;
  @ViewChild(NewAdicionalModalComponent) newAdicionalModal!: NewAdicionalModalComponent;

  columns = [
    { name: 'Titulo', entityName: 'titulo' },
    { name: 'Descrição', entityName: 'descricao' },
    { name: 'Valor', entityName: 'valor' },
    { name: 'Tag', entityName: 'tag' },
    { name: 'Status', entityName: 'status' }
  ];

  /* Componente Pesquisa produto  */
  onSearchResult(searchTerm: string) {
    console.log('Pesquisa realizada:', searchTerm);
    this.paginator(this.currentPage);
  }

  /*  Paginação */
  onPageChange(page: number) {
    console.log('Página alterada:', page);
    this.paginator(page);
  }
  paginator(page: number) {
    this.adicionalService.paginator(page,this.storeUtils.getLojaAtual().id).pipe(first()).subscribe({
      next: (response: PageResponse<Adicional>) => {
        this.adicionais = response.content;
        this.isLastPage = response.last;
      }
    })
  }
 
  findAdicionais(item?: any, param?:string) {
    this.adicionalService.findall(item,this.storeUtils.getLojaAtual().id, param).pipe(first()).subscribe({  
      next: (response: Adicional[]) => {
        this.adicionais = response;
      }
    })
  }


  updateProduct(){
    console.log(this.selectedItem);
    if(this.selectedItem.id == 0){
      //this.saveProduct();
    } else {
      this.adicionalService.update(this.selectedItem).subscribe({
        next: (response: Produto) => {
          console.error('Atualização bem-sucedida:', response);
        },
        error: (error) => {
          console.error('Erro ao atualizar o produto:', error);
        }
      });
    }
  }
  // saveProduct(){
  //   this.adicionalService.save(this.selectedItem, this.selectedFile!).subscribe({
  //     next: (response: Produto) => {
  //       console.log('Produto salvo com sucesso:', response);
  //       this.paginator(this.currentPage);
  //     },
  //     error: (error) => {
  //       console.error('Erro ao salvo o produto:', error);
  //     }
  //   });
  // }

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

  onUpsertAdicional(adicional : Adicional) {
    console.log("Atualizar")
  }

  onUpdateItem(event : Produto){ 
    this.newAdicionalModal.openModal(event);
  }

  onCreateAdicional(){ 
    this.newAdicionalModal.openModal();
  }
  onRemoveItem(event : Produto){ 
    console.log('Item removido:', event);
  }
}
