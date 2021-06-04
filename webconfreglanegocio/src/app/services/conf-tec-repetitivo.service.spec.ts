import { TestBed } from '@angular/core/testing';

import { ConfTecRepetitivoService } from './conf-tec-repetitivo.service';

describe('ConfTecRepetitivoService', () => {
  let service: ConfTecRepetitivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfTecRepetitivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
