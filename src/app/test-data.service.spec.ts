import { TestBed } from '@angular/core/testing';

import { TestDataService } from './test-data.service';

describe('TestDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestDataService = TestBed.get(TestDataService);
    expect(service).toBeTruthy();
  });
});
