import { TestBed } from '@angular/core/testing';
import { Nonprodweather } from './nonprodweather';
import { signal } from '@angular/core';

describe('Nonprodweather', () => {
  let service: Nonprodweather;

  
  beforeEach(() => {
    TestBed.configureTestingModule({

    });
    service = TestBed.inject(Nonprodweather);
    service.setZzipSig('95630');
  });

    it('should return jeocodes', () => {
    //console.log('Testing the abstract service, weather. ');
      
      
      let resultSig = service.getJeoCodeByKNOWNZipSig();// signal('95630'));
      //service.jeocodeSigA();
      //const jeo = service.inProgressGeoCodeSig();// jeoSig(); //I think this passes because it is a HOT signal 
      
    let result = resultSig();  
    expect (result?.name).toEqual('Folsom');
  });

  
  it('should be created', () => {
    //console.log('Testing the service, nonprodweather. ');
    expect(service).toBeTruthy();
  });
});
