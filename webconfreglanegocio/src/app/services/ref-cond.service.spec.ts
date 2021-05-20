import { TestBed } from '@angular/core/testing';

import { RefCondService } from './ref-cond.service';

describe('RefCondService', () => {
  let service: RefCondService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefCondService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
