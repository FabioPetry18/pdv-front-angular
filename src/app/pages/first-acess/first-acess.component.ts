import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login, Usuario } from '../../interface/login';
import { LoginService } from '../../service/loginService';


@Component({
  selector: 'app-first-acess',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './first-acess.component.html',
  styleUrl: './first-acess.component.css'
})
export class FirstAcessComponent implements OnInit {
  usuario:Login = new Login();
  edit = {
    id: 0,
    senha: "",
    confirmacaoSenha: "",
    usuario: "",
    primeiroacesso: "N",
    acessos:"",
    userType: "",
  }



  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private router: Router,
    private loginService: LoginService,
    
  ){}
  
  update(){
    this.loginService.update(this.edit, this.usuario.id).pipe(first()).subscribe({
      next: (data) => {
        this.store()
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

    
  ngOnInit(): void {
    const data : Usuario = this.authService.getUserData();
    this.usuario = data.login
    this.edit.usuario = data.login.usuario;
    this.edit.id = data.login.id;
    this.edit.acessos = data.login.acessos;
    this.edit.userType = data.login.userType;
  };

  store() {
    this.router.navigate(['/first-acess-store'], { replaceUrl: true });
  }
  
  
}
