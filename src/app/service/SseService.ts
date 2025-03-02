import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SseService implements OnDestroy {
  private eventSource: EventSource | null = null;
  private dataStream = new Subject<any>();

  // Exponha o Subject como um Observable para ouvir os dados recebidos
  public data$ = this.dataStream.asObservable();

  connect(url: string): void {
    if (this.eventSource) {
      this.disconnect(); // Garante que não há outra conexão aberta
    }

    this.eventSource = new EventSource(url);

    // Ouvindo mensagens
    this.eventSource.onmessage = (event) => {
      console.log('SSE event received:', event);
      const data = JSON.parse(event.data);
      this.dataStream.next(data); // Emitindo o evento recebido
    };

    // Ouvindo erros
    this.eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      this.disconnect(); // Fecha a conexão em caso de erro
    };
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  ngOnDestroy(): void {
    this.disconnect(); // Fecha a conexão ao destruir o serviço
  }
}
