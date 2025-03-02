import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, Usuario } from '../../interface/login';
import { LoginService } from '../../service/loginService';
import { DynamicTableComponent } from "../../components/dynamic-table.component";
import { ProductService } from '../../service/productService';
import { PageResponse, Produto } from '../../interface/produto';
import { PaginationComponent } from '../../components/paginator.component';
import { SearchComponent } from "../../components/search.component";


@Component({
  selector: 'app-first-acess',
  standalone: true,
  imports: [FormsModule, CommonModule, DynamicTableComponent, PaginationComponent, SearchComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent  {
  constructor(private productService:ProductService) { }
  produtos : Array<Produto> = [];
  isLastPage: boolean = false;
  currentPage: number = 1;

  columns = [
    { name: 'Titulo', entityName: 'titulo' },
    { name: 'Descrição', entityName: 'descricao' },
    { name: 'Valor', entityName: 'valor' },
    { name: 'Status', entityName: 'status' }
  ];


  /*
    --<app-paginator>
    Acionado pelo componente de paginacao quando for alterado uma pagina
    inclusive na primeira renderização (quando a pagina é 1)
  */
  onPageChange(page: number) {
    this.currentPage = page;
    this.paginator(page);
  }
  /*
    --<app-search>
    Acionado pelo componente de pesqusia quando for feito uma pesquisa 
  */
  onSearchResult(searchTerm: string) {
    console.log('Pesquisa realizada:', searchTerm);
    this.paginator(this.currentPage);
  }

  paginator(page: number) {
    this.productService.paginator(page,1).pipe(first()).subscribe({
      next: (response: PageResponse<Produto>) => {
        this.produtos = response.content;
        this.isLastPage = response.last;
      }
    })
  }
    
  
}
