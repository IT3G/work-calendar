import { TestBed } from '@angular/core/testing';

import { SnowService } from './snow.service';

describe('SnowService', () => {
  let service: SnowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
