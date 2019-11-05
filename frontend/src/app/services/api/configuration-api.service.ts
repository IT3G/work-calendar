import { Injectable } from '@angular/core';
import { ConfigModel } from 'src/app/models/config.model';

@Injectable({
  providedIn: 'root'
})
export abstract class ConfigurationApiService {
  constructor() {}

  abstract getConfig(): ConfigModel;

  abstract updateConfig(): void;
}
