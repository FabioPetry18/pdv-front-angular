import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginService } from '../../service/loginService';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../interface/login';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
  <div class=" min-h-screen min-w-screen flex items-center justify-center flex-col gap-2">
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Usuário</legend>
      <input type="text" class="input validator" [(ngModel)]="form.usuario" required/>
      <div class="validator-hint">Campo obrigatório!</div>
    </fieldset>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Senha</legend>
      <input type="text" class="input validator" [(ngModel)]="form.senha" required />
      <div class="validator-hint">Campo obrigatório!</div>
    </fieldset>
    <button  (click)="autenticar()" class="btn btn-primary">Entrar</button>
  </div>
  `,
})export class LoginComponent {
  form = {
    usuario: "fabio.petry",
    senha: "123456"
  };
  errorMessage: string | null = null;

  constructor(private router: Router, private loginService: LoginService, private authService: AuthService, private toastr: ToastrService) {}

  


  autenticar() {
    this.errorMessage = null;

    this.loginService.signUp(this.form).pipe(first()).subscribe({
      next: (res: Usuario) => {
        this.authService.storeUserData(res); 
        sessionStorage.setItem('token', res.token);
        if(res.login.primeiroacesso === 'N'){
          this.goOrder();
        } else {
          this.goTheme();
        }
      },
      error: (error) => {
        console.error('Erro ao autenticar:', error);
        this.toastr.error('Algo deu errado!', 'Erro');
      }
    });
  }

  goOrder() {
    console.log("redirecionando");
    this.router.navigate(["/pedido"]);
  }

  goTheme() {
    console.log("redirecionando");
    this.router.navigate(["/theme"], { replaceUrl: true });
  }
}