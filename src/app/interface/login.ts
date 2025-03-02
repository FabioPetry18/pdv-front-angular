export class Usuario {
  id: number;
  nome: string;
  sobrenome: string;
  telefone: number;
  assinatura: Assinatura;
  login: Login;
  token: string;
  lojas: Loja[];

  constructor() {
      this.id = 0;
      this.nome = '';
      this.sobrenome = '';
      this.telefone = 0;
      this.assinatura = new Assinatura();
      this.login = new Login();
      this.token = '';
      this.lojas = [];
  }
}

export class Assinatura {
  id: number;
  qtdLojas: number;
  dataAbertura: string;
  dataFechamento: string;
  dataUltimoPagamento: string;
  status: string;

  constructor() {
      this.id = 0;
      this.qtdLojas = 0;
      this.dataAbertura = '';
      this.dataFechamento = '';
      this.dataUltimoPagamento = '';
      this.status = '';
  }
}

export class Login {
  id: number;
  usuario: string;
  senha: string;
  primeiroacesso: string;
  acessos: string;
  userType: string;

  constructor() {
      this.id = 0;
      this.usuario = '';
      this.senha = '';
      this.primeiroacesso = '';
      this.acessos = '';
      this.userType = '';
  }
}

export class Loja {
  id: number;
  nome: string;
  endereco: string;
  bairro: string;
  rua: string | null;
  numero: string;
  cep: string;
  uf: string;
  cidade: string;
  telefone: number;
  horarios: Horario[];
  configuracao: Configuracao[];

  constructor() {
      this.id = 0;
      this.nome = '';
      this.endereco = '';
      this.bairro = '';
      this.rua = null;
      this.numero = '';
      this.cep = '';
      this.uf = '';
      this.cidade = '';
      this.telefone = 0;
      this.horarios = [];
      this.configuracao = [];
  }
}

export class Horario {
  id: number;
  diaSemana: string;
  fechamento: string;
  abertura: string;

  constructor() {
      this.id = 0;
      this.diaSemana = '';
      this.fechamento = '';
      this.abertura = '';
  }
}

export class Configuracao {
  id: number;
  parametro: string;
  valor: string;

  constructor() {
      this.id = 0;
      this.parametro = '';
      this.valor = '';
  }
}
