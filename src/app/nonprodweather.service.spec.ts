import { TestBed } from '@angular/core/testing';

import { NonprodweatherService } from './nonprodweather.service';

describe('NonprodweatherService', () => {
  let service: NonprodweatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonprodweatherService);
  });

  it('should be created', () => {
    console.log('Testing NonprodweatherService');
    expect(service).toBeTruthy();
  });
});
