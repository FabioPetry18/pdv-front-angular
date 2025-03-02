import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  storeChanged = new EventEmitter<any>();

  emitStoreChange(store: any) {
    this.storeChanged.emit(store);
  }
}
