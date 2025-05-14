import { TestBed } from '@angular/core/testing';

import { TraccionService } from './traccion.service';

describe('TraccionService', () => {
  let service: TraccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
