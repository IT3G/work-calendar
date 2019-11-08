import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ContextStoreService } from '../../core/store/context-store.service';

@Injectable()
export class AppLoadService {
  constructor(private contextStoreService: ContextStoreService) {}

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contextStoreService.setCurrentDate(moment().startOf('day'));
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }
}
