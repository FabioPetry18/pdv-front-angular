import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ProprietarioDTO } from '../../interface/proprietario';
import { ProprietarioService } from '../../service/proprietarioService';
import { ToastrService } from 'ngx-toastr';
import { UserTypes } from '../../interface/login';

@Component({
  selector: 'app-cadastro-proprietario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cadastro-proprietario.component.html',
  styleUrl: './cadastro-proprietario.component.css'
})
export class CadastroProprietarioComponent {
  proprietario: ProprietarioDTO = new ProprietarioDTO();
  confirmacaoSenha: string = '';
  cadastroRealizado: boolean = false;
  cadastroId: number = 0;
  telefoneInput: string = '';
  telefoneInvalido: boolean = false;

  constructor(
    private proprietarioService: ProprietarioService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  formatarTelefone(valor: string) {
    console.log('Valor recebido:', valor);
    
    if (!/\d/.test(valor)) {
      this.telefoneInput = this.telefoneInput.replace(/\D/g, '');
      return;
    }
    
    valor = valor.replace(/\D/g, '');
    
    if (valor.length > 0) {
      valor = valor.substring(0, 11);
      
      if (valor.length > 2) {
        valor = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
      }
      if (valor.length > 10) {
        valor = `${valor.substring(0, 10)}-${valor.substring(10)}`;
      }
    }
    
    this.telefoneInput = valor;
    
    const numeroTelefone = parseInt(valor.replace(/\D/g, ''));
    this.proprietario.telefone = isNaN(numeroTelefone) ? 0 : numeroTelefone;
    
    this.validarTelefone();
  }
  
  validarTelefone() {
    const telefone = this.telefoneInput.replace(/\D/g, '');
    this.telefoneInvalido = telefone.length < 10 || telefone.length > 11;
  }

  validarFormulario(): boolean {
    this.validarTelefone();
    if (this.telefoneInvalido || this.proprietario.telefone === 0) {
      this.toastr.error('Telefone inválido', 'Erro');
      return false;
    }
    
    if (!this.proprietario.nome || !this.proprietario.sobrenome) {
      this.toastr.error('Preencha todos os campos obrigatórios', 'Erro');
      return false;
    }

    if (this.telefoneInvalido || !this.proprietario.telefone) {
      this.toastr.error('Telefone inválido ou não preenchido', 'Erro');
      return false;
    }

    if (!this.proprietario.login.usuario || !this.proprietario.login.senha) {
      this.toastr.error('Preencha os dados de login', 'Erro');
      return false;
    }

    if (this.proprietario.login.senha !== this.confirmacaoSenha) {
      this.toastr.error('As senhas não coincidem', 'Erro');
      return false;
    }

    if (this.proprietario.login.senha.length < 8) {
      this.toastr.error('A senha deve ter pelo menos 8 caracteres', 'Erro');
      return false;
    }

    return true;
  }

  cadastrar() {
    if (!this.validarFormulario()) {
      return;
    }
  
    this.proprietario.status = 'N';
    this.proprietario.assinatura.status = 'N';
    this.proprietario.assinatura.dataAbertura = new Date();
    this.proprietario.login.primeiroacesso = 'S';
    this.proprietario.login.userType = UserTypes.DONO;
  
    this.proprietarioService.cadastrar(this.proprietario).pipe(first()).subscribe({
      next: (response) => {
        this.cadastroRealizado = true;
        this.cadastroId = response.id;
        this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso');
      },
      error: (error) => {
        console.error('Erro ao cadastrar:', error);
        this.toastr.error('Erro ao realizar cadastro', 'Erro');
      }
    });
  }

  verificarStatus() {
    if (this.cadastroId > 0) {
      this.proprietarioService.verificarStatus(this.cadastroId).pipe(first()).subscribe({
        next: (response) => {
          if (response.status === 'S' && response.assinatura.status === 'S') {
            this.toastr.success('Pagamento confirmado! Redirecionando para login...', 'Sucesso');
            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 2000);
          } else {
            this.toastr.info('Pagamento ainda pendente. Tente novamente mais tarde.', 'Informação');
          }
        },
        error: (error) => {
          console.error('Erro ao verificar status:', error);
          this.toastr.error('Erro ao verificar status do pagamento', 'Erro');
        }
      });
    }
  }

  voltarParaLogin() {
    this.router.navigate(['/auth/login']);
  }

  ngOnInit() {
    if (this.proprietario.telefone) {
      const telefoneStr = this.proprietario.telefone.toString();
      if (telefoneStr.length >= 10) {
        const ddd = telefoneStr.substring(0, 2);
        const parte1 = telefoneStr.substring(2, 7);
        const parte2 = telefoneStr.substring(7);
        this.telefoneInput = `(${ddd}) ${parte1}-${parte2}`;
      }
    }
  }
}