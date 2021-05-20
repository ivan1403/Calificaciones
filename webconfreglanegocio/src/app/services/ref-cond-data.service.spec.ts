import { TestBed } from '@angular/core/testing';

import { RefCondDataService } from './ref-cond-data.service';

describe('RefCondDataService', () => {
  let service: RefCondDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefCondDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
