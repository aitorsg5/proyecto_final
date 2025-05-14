import { TestBed } from '@angular/core/testing';

import { CilindradaService } from './cilindrada.service';

describe('CilindradaService', () => {
  let service: CilindradaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CilindradaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
