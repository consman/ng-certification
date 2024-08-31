import { TestBed } from '@angular/core/testing';

import { NonprodweatherService } from './nonprodweather.service';

describe('NonprodweatherService', () => {
  let service: NonprodweatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ]
    });
    service = TestBed.inject(NonprodweatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
