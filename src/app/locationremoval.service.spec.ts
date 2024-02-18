import { TestBed } from '@angular/core/testing';

import { LocationremovalService } from './locationremoval.service';

describe('LocationremovalService', () => {
  let service: LocationremovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationremovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
