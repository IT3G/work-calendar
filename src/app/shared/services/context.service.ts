import { Injectable } from '@angular/core';
import { ContextStoreService } from 'src/app/store/context-store.service';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  constructor(private contextStoreService: ContextStoreService) {}

  public initDefault() {
    //this.contextStoreService.
  }
}
