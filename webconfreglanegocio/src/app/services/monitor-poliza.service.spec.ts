import { TestBed } from '@angular/core/testing';

import { MonitorPolizaService } from './monitor-poliza.service';

describe('MonitorPolizaService', () => {
  let service: MonitorPolizaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonitorPolizaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
