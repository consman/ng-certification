import { TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { Nonprodweather } from './nonprodweather';

describe('Nonprodweather', () => {
  let service: Nonprodweather;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(Nonprodweather);
  });

  it('should be created', () => {
    console.log('Testing the service, nonprodweather. ');
    expect(service).toBeTruthy();
  });
});
