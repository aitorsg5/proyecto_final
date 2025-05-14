import { TestBed } from '@angular/core/testing';

import { CarburanteService } from './carburante.service';

describe('CarburanteService', () => {
  let service: CarburanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarburanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
