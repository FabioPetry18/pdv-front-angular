import { Loja, Login } from './login';

export class AssinaturaDTO {
    id: number;
    qtdLojas: number;
    dataAbertura: Date;
    dataFechamento: Date;
    dataUltimoPagamento: Date;
    status: string;

    constructor() {
        this.id = 0;
        this.qtdLojas = 0;
        this.dataAbertura = new Date();
        this.dataFechamento = new Date();
        this.dataUltimoPagamento = new Date();
        this.status = '';
    }
}

export class ProprietarioDTO {
    id: number;
    nome: string;
    sobrenome: string;
    telefone: number;
    status: string;
    assinatura: AssinaturaDTO;
    login: Login;
    lojas: Loja[];

    constructor() {
        this.id = 0;
        this.nome = '';
        this.sobrenome = '';
        this.telefone = 0;
        this.status = '';
        this.assinatura = new AssinaturaDTO();
        this.login = new Login();
        this.lojas = [];
    }
}