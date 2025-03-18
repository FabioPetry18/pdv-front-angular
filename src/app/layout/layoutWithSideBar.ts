import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StoreComboBoxComponent } from '../components/store-combo-box.component'; 
import { AuthService } from '../service/auth.service';
import { Loja, Usuario } from '../interface/login';
import { CurrentStoreUtils } from '../utils/current-store';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, StoreComboBoxComponent, RouterLink],
  template: `
<div class="flex min-h-screen ">
  <!-- Botão para abrir o menu no mobile -->
  <button 
    (click)="toggleMenu()" 
    class="fixed top-4 left-4 p-2 bg-transparent border-0 z-50 lg:hidden"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6">
      <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  </button>

  <!-- Sidebar (Menu Lateral) -->
  <aside 
    [class.hidden]="!menuOpen" 
    class="fixed left-0 top-0 w-64 min-h-screen bg-base-100 border-r border-base-300 p-4 z-40 transition-all flex flex-col lg:relative lg:flex lg:w-64"
  >
    <!-- Botão para fechar o menu no mobile -->
    <div class="flex justify-end lg:hidden">
      <button (click)="toggleMenu()" class="p-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6">
          <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- Dropdown de lojas -->
    <div class="p-2">
      <app-store-combo-box 
        class="w-full"
        (selectedStoreChange)="onStoreSelected($event)"
      ></app-store-combo-box>
    </div>

    <!-- Navegação (Menu) -->
    <nav class="flex flex-col space-y-2 mt-4  ">
      <a class="flex items-center px-4 py-2 text-base-content rounded-lg hover:bg-gray-200" href="#">
        <span class="text-base-content">Novos Pedidos</span>
      </a>
      <a class="flex items-center px-4 py-2 text-base-content rounded-lg hover:bg-gray-200" [routerLink]="'/products'">
        <span class="text-base-content">Produtos</span>
      </a>
    </nav>
  </aside>

  <!-- Conteúdo Principal -->
  <main class="flex-1">
    <router-outlet></router-outlet>
  </main>
</div>



  `,
})
export class MainLayoutComponent implements OnInit {
  menuState: { [key: string]: boolean } = {};
  lojas: Loja[] = [];
  selectedStore: any = null;
  menuOpen: boolean = false; // Estado do menu
  isLargeScreen: boolean = window.innerWidth >= 768; // Verifica se a tela é grande

  constructor(private currentStoreUtils: CurrentStoreUtils, private authService : AuthService) {
    window.addEventListener('resize', this.handleResize.bind(this)); // Adiciona listener para redimensionamento
  }
  ngOnInit(): void {
    this.currentStoreUtils.init();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen; // Alterna o estado do menu
  }

  onStoreSelected(store: any): void {
    if (this.selectedStore?.id === store.id) {
      return;
    }
    this.selectedStore = store;
    this.currentStoreUtils.setLoja(store);
  }

  handleResize(): void {
    this.isLargeScreen = window.innerWidth >= 768; // Atualiza o estado com base na largura da tela
    if (this.isLargeScreen) {
      this.menuOpen = true; // Garante que o menu esteja aberto em telas grandes
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const menuElement = document.querySelector('aside');

    // Verifica se o clique foi fora do menu e do botão
    if (this.menuOpen && menuElement && !menuElement.contains(target) && !target.closest('button')) {
      this.menuOpen = false; // Fecha o menu
    }
  }
}
