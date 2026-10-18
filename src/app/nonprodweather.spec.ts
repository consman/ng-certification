import { TestBed } from '@angular/core/testing';
import { Nonprodweather } from './nonprodweather';
import { signal } from '@angular/core';

describe('Nonprodweather', () => {
  let service: Nonprodweather;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Nonprodweather);
  });

    it('should return jeocodes', () => {
    //console.log('Testing the abstract service, weather. ');
      let result ='';
      
      service.getGeoCodeInfoFromZipWithKnownGeoCodes(signal('95630'));
      //service.jeocodeSigA();
      const jeo = service.jeocodeSigA();// jeoSig(); //I think this passes because it is a HOT signal 
      if (jeo) {
        result = jeo.name;
      }//
      
    expect (result).toEqual('Folsom');
  });

  
  it('should be created', () => {
    //console.log('Testing the service, nonprodweather. ');
    expect(service).toBeTruthy();
  });
});
