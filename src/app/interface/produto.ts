import { Loja } from "./login";

  export class Adicional {
    id?: number;
    titulo?: string;
    descricao?: string;
    valor?: number;
    tag?: string;
    status: string = 'Ativo';
    produtoid?: number;
  
    constructor() {}
  }
  
  export class Produto {
    id?: number;
    titulo?: string;
    descricao?: string;
    valor?: number;
    tag?: string;
    adicionais: Adicional[] = [];
    imagem?: string;
    status: string = 'Ativo';
    loja?: Loja;
    constructor() { }
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
  