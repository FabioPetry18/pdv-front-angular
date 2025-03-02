import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StoreComboBoxComponent } from '../components/store-combo-box.component'; 
import { StoreService } from '../services/store.service';
import { AuthService } from '../service/auth.service';
import { Loja, Usuario } from '../interface/login';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, StoreComboBoxComponent, RouterLink],
  template: `
  <div class="relative flex">
    <button (click)="toggleMenu()" class="absolute top-4 left-4 p-2 bg-transparent border-0 z-10">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6">
        <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>
    <aside [class.hidden]="!menuOpen && !isLargeScreen" class="flex flex-col w-64 px-4 py-8 overflow-y-auto bg-base-100 shadow-2xl  z-20">
      <app-store-combo-box class="mt-6"
            [stores]="lojas" 
            (selectedStoreChange)="onStoreSelected($event)">
      </app-store-combo-box>

      <div class="flex flex-col justify-between flex-1 mt-6 ">
        <nav>
          <a class="flex items-center px-4 py-2 text-base-content bg-base-100 rounded-lg dark:bg-gray-800 dark:text-gray-200" href="#">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="mx-4 font-medium text-base-content">Novos Pedidos</span>
          </a>
          <a class="flex items-center px-4 py-2 mt-5 text-base-content transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="mx-4 font-medium text-base-content">Pedidos Aceitos</span>
          </a>
          <a 
            class="flex items-center px-4 py-2 mt-5 text-base-content transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            [routerLink]="'/products'"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="mx-4 font-medium text-base-content">Produtos</span>
          </a>
        </nav>
      </div>
    </aside>
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

  constructor(private storeService: StoreService, private authService : AuthService) {
    window.addEventListener('resize', this.handleResize.bind(this)); // Adiciona listener para redimensionamento
  }
  ngOnInit(): void {
    const user : Usuario = this.authService.getUserData();
    this.lojas = user.lojas;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen; // Alterna o estado do menu
  }

  onStoreSelected(store: any): void {
    this.selectedStore = store;
    this.storeService.emitStoreChange(store);
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
