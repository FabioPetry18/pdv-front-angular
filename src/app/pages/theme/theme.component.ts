import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { IphoneThemeComponent } from "./components/iphone.component";


@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [RouterLink, IphoneThemeComponent],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css'
})
export class ChoseThemeComponent {
  theme: string = 'light';
  themes = ["light","luxury","dark","retro","bumblebee","night","halloween"]
  currentThemeIndex: number = 0;

  constructor(
    private router: Router
  ){}

  changeTheme() { 
      document.documentElement.setAttribute('data-theme', this.theme);
      localStorage.setItem('theme', this.theme);
  }
  temaAnterior() {
    if (this.currentThemeIndex > 0) {
      this.currentThemeIndex--; 
    } else {
      this.currentThemeIndex = this.themes.length - 1; 
    }
    this.updateTheme(); 
  }

  proximoTema() {
    if (this.currentThemeIndex > 0) {
      this.currentThemeIndex--; 
    } else {
      this.currentThemeIndex = this.themes.length - 1; 
    }
    this.updateTheme(); 
  }

  private updateTheme() {
    this.theme = this.themes[this.currentThemeIndex]; 
    this.changeTheme()
  }

  firstacess() {
    this.router.navigate(['/first-acess']);
  }
  

}
