import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { first, Subscription } from 'rxjs';


@Component({
   selector: 'theme-iphone',
   standalone: true,
   imports: [FormsModule, CommonModule],
   template: `
   <div>
      <div class="relative w-72 h-[600px] rounded-[45px] shadow-[0_0_2px_2px_rgba(255,255,255,0.1)] border-8 border-zinc-900 ml-1">
        <!-- Dynamic Island -->
        <div class="absolute top-2 left-1/2 transform -translate-x-1/2 w-[90px] h-[22px] bg-zinc-900 rounded-full z-20">
        </div>
      
        <div class="absolute -inset-[1px] border-[3px] border-zinc-700 border-opacity-40 rounded-[37px] pointer-events-none"></div>
      
        
        <!-- Screen Content -->
        <div [attr.data-theme]="theme"  class=" relative w-full h-full text-base-content  rounded-[37px] overflow-hidden flex items-center justify-center  bg-zinc-900/10">
           <div class="card bg-base-100  w-[calc(100%-3rem)] shadow-sm">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
                </figure>
                <div class="card-body">
                  <h2 class="card-title text-base-content">Card Title</h2>
                  <p class="text-base-content">A card component has a figure, a body part, and inside body there are title and actions parts</p>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary text-primary-content">Comprar</button>
                  </div>
                </div>
            </div>

        </div>
        
        <!-- Left Side Buttons -->
        <!-- Silent Switch -->
        <div class="absolute left-[-12px] top-20 w-[6px] h-8 bg-zinc-900 rounded-l-md shadow-md"></div>
        
        <!-- Volume Up -->
        <div class="absolute left-[-12px] top-36 w-[6px] h-12 bg-zinc-900 rounded-l-md shadow-md"></div>
        
        <!-- Volume Down -->
        <div class="absolute left-[-12px] top-52 w-[6px] h-12 bg-zinc-900 rounded-l-md shadow-md"></div>
        
        <!-- Right Side Button (Power) -->
        <div class="absolute right-[-12px] top-36 w-[6px] h-16 bg-zinc-900 rounded-r-md shadow-md"></div>
      </div>
    </div>
   `,
})
export class IphoneThemeComponent {
  @Input() theme: string = '';
  constructor(
    private router: Router
  ){}


 

}
