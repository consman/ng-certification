import { TestBed } from '@angular/core/testing';

import { NonprodweatherService } from './nonprodweather.service';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

describe('NonprodweatherService', () => {
  let service: NonprodweatherService = new NonprodweatherService();

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
