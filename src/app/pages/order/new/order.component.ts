import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { first, Subscription } from 'rxjs';
import { ItemComponent } from "../../../components/item.component";
import { SseService } from '../../../service/SseService';
import { AuthService } from '../../../service/auth.service';
import { CurrentStoreUtils } from '../../../utils/current-store';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderNewComponent implements OnInit, OnDestroy  {
  list: any[] = [];
  private storeSubscription: Subscription = new Subscription();
  private subscription: Subscription | null = null;

  constructor(
    private http: HttpClient, 
    private sseService: SseService,  
    private authService: AuthService, 
    private currentStoreUtils: CurrentStoreUtils
  ){}

  obj ={
    "npedido":556,
    "endereco":"Tapera, rua da praia,63",
    "itens":[
       {
          "nome":"Açai 500ml",
          "quantidade":1.00,
          "adicionais":[
             {
                "nome":"Nutella",
                "valor":"R$2,00",
                "quantidade":1.00
             }
          ],
          "valor":"R$15,00",
          "valorAdicional":"R$2,00",
          "valorTotal":"R$17,00"
       }
    ],
    "valorTotal":"R$17,00"
 }

  ngOnInit(): void {
    this.storeSubscription = this.currentStoreUtils.lojaSelecionada$.subscribe(store => {
      if (store) {
        const codLoja = store.id; // Assuming store has an id property
        const url = `http://localhost:8081/pedido/sse/${codLoja}`;
        this.sseService.disconnect();
        
        // Reset list
        this.list = [];
        
        // Connect to new SSE endpoint
        this.sseService.connect(url);
        
        // Fetch new orders for selected store
        this.buscarNovosPedidos(codLoja);
        this.list = [this.obj];
        
      }
    });

    // Initial SSE subscription
    this.subscription = this.sseService.data$.subscribe((pedido) => {
      this.list.push(pedido);
    });
  }

  buscarNovosPedidos(codLoja: number) {
    const token = sessionStorage.getItem('token');
    return this.http.get(`http://localhost:8081/pedido?size=999&page=1&codloja=${codLoja}&status=1`, {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + token})
    }).pipe(first()).subscribe({
      next: (res) => {
        this.list.push(res);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.storeSubscription?.unsubscribe();
    this.sseService.disconnect();
  }
}
