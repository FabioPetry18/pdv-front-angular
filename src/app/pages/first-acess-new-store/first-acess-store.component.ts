import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { LojaService } from '../../service/lojaService';
import { Usuario } from '../../interface/login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-first-acess',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './first-acess-store.component.html',
  styleUrl: './first-acess-store.component.css'
})
export class FirstAcessStoreComponent implements OnInit {
  usuario = "";
  antigasenha = "123456";
  novasenha = "";
  login: Usuario = new Usuario();

  constructor(
    private authService: AuthService,
    private lojaService: LojaService,
    private router: Router
  ){}

  loja = {
    nome: '',
    endereco: '',
    bairro: '',
    rua: '',
    numero: '',
    cep: '',
    uf: '',
    cidade: '',
    telefone: '',
    horarios: [
      { id: null, abertura: '08:00', fechamento: '18:00', diaSemana: 'SEGUNDA' },
      { id: null, abertura: '08:00', fechamento: '18:00', diaSemana: 'TERCA' },
      { id: null, abertura: '08:00', fechamento: '18:00', diaSemana: 'QUARTA' },
      { id: null, abertura: '08:00', fechamento: '18:00', diaSemana: 'QUINTA' },
      { id: null, abertura: '08:00', fechamento: '18:00', diaSemana: 'SEXTA' },
      { id: null, abertura: '08:00', fechamento: '18:00', diaSemana: 'SABADO' },
      { id: null, abertura: '08:00', fechamento: '18:00', diaSemana: 'DOMINGO' }

    ],
    configuracao: [
      {
        id: null,
        parametro: "permite cupom",
        valor: "false"
    },
    {
        id: null,
        parametro: "theme",
        valor: ""
    }
    ]
  };
  
  salvarLoja() {
    this.lojaService.add(this.loja, this.login.id).pipe(first()).subscribe({
      next: (data) => {
        this.goOrder()
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
    
  ngOnInit(): void {
    this.login = this.authService.getUserData();
    this.loja.configuracao[1].valor = localStorage.getItem('theme') || 'light'
    this.usuario =  this.login.login.usuario
  };

  goOrder() {
    console.log("redirecionando");
    this.router.navigate(["/auth/login"], { replaceUrl: true });
  }
  
}
