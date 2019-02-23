import { TestBed } from '@angular/core/testing';

import { AppLoadService } from './app-load.service';

describe('AppLoadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppLoadService = TestBed.get(AppLoadService);
    expect(service).toBeTruthy();
  });
});
