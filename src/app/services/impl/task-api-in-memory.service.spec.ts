import { TestBed } from '@angular/core/testing';
import { TaskApiInMemoryService } from './task-api-in-memory.service';

describe('TaskDataserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskApiInMemoryService = TestBed.get(TaskApiInMemoryService);
    expect(service).toBeTruthy();
  });
});
