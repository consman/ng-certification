import { TestBed } from '@angular/core/testing';
import { Nonprodweather } from './nonprodweather';

describe('Nonprodweather', () => {
  let service: Nonprodweather;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Nonprodweather);
  });

  it('should be created', () => {
    console.log('Testing the service, nonprodweather. ');
    expect(service).toBeTruthy();
  });
});
