import { Compiler, Injectable, Injector } from '@angular/core';

import * as moment from 'moment';

import { SnowService } from 'src/app/winter-snow/snow/snow.service';
import { ContextStoreService } from '../../core/store/context-store.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppLoadService {
  constructor(
    private contextStoreService: ContextStoreService,
    private compiler: Compiler,
    private injector: Injector
  ) {}

  initializeApp(): Promise<void> {
    if (this.canSnow) {
      this.startSnowing();
    }

    return new Promise((resolve, reject) => {
      this.contextStoreService.setCurrentDate(moment().startOf('day'));
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }

  private get canSnow(): boolean {
    try {
      const today = new Date();
      const currentYear = today.getFullYear();
      const snowStartDate = new Date(
        `${environment.winterSnowPageEffect.startMonth} ${environment.winterSnowPageEffect.startDate}, ${currentYear}`
      );
      const snowEndDate = new Date(
        `${environment.winterSnowPageEffect.endMonth} ${environment.winterSnowPageEffect.endDate}, ${currentYear}`
      );
      return !moment(today).isBetween(snowEndDate, snowStartDate);
    } catch (e) {
      console.error(e.toString());
      return false;
    }
  }

  private async startSnowing(): Promise<void> {
    const loadedModule = (await import('../../winter-snow/winter-snow.module')).WinterSnowModule;
    const factory = await this.compiler.compileModuleAsync(loadedModule);
    const module = factory.create(this.injector);
    module.injector.get<SnowService>(SnowService);
  }
}
