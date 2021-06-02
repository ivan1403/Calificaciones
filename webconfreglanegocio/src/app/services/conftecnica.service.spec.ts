import { TestBed } from '@angular/core/testing';

import { ConftecnicaService } from './conftecnica.service';

describe('ConftecnicaService', () => {
  let service: ConftecnicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConftecnicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
