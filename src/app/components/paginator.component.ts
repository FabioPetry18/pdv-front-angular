import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
        <div class="join">
            <button class="join-item btn" (click)="changePage(currentPage - 1)" [disabled]="currentPage === 1">«</button>

            <button *ngFor="let page of pages" 
                    class="join-item btn" 
                    [ngClass]="{'btn-active': page === currentPage}"
                    (click)="changePage(page)">
                {{ page }}
            </button>

            <button class="join-item btn" (click)="changePage(currentPage + 1)" [disabled]="isLastPage">»</button>
        </div>
    </div>
  `,
})
export class PaginationComponent implements OnInit {
    @Input() isLastPage: boolean = false;
    @Output() pageChange = new EventEmitter<number>();
  
    pages: number[] = Array.from({ length: 2 }, (_, i) => i + 1);
    currentPage: number = 1;

    ngOnInit() {
        this.pageChange.emit(this.currentPage); 
    }
  
    changePage(newPage: number) {
      if (newPage < 1 || (this.isLastPage && newPage > this.pages[this.pages.length - 1])) return;
  
      this.currentPage = newPage;
      this.pageChange.emit(this.currentPage);
  
      if (this.currentPage > this.pages[this.pages.length - 1]) {
        this.pages.shift(); // Remove o primeiro item
        this.pages.push(this.currentPage); // Adiciona o próximo número
      }
    }
  }
