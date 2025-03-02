export class ProdutoPK {
    codproduto: number;
    idloja: number;
  
    constructor() {
      this.codproduto = 0;
      this.idloja = 0;
    }
  }
  
  export class Adicional {
    id: number;
    titulo: string;
    descricao: string;
    valor: number;
    tag: string;
    status: string;
  
    constructor() {
      this.id = 0;
      this.titulo = '';
      this.descricao = '';
      this.valor = 0;
      this.tag = '';
      this.status = '';
    }
  }
  
  export class Produto {
    id: ProdutoPK;
    titulo: string;
    descricao: string;
    valor: number;
    adicionais: Adicional[];
    imagem: string;
    status: string;
  
    constructor() {
      this.id = new ProdutoPK();
      this.titulo = '';
      this.descricao = '';
      this.valor = 0;
      this.adicionais = [];
      this.imagem = '';
      this.status = '';
    }
  }
  
  export class PageResponse<T> {
    content: T[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
  
    constructor() {
      this.content = [];
      this.pageable = {
        pageNumber: 0,
        pageSize: 10,
        offset: 0,
        paged: true,
        unpaged: false,
      };
      this.totalElements = 0;
      this.totalPages = 0;
      this.size = 10;
      this.number = 0;
      this.first = true;
      this.last = false;
    }
  }
  