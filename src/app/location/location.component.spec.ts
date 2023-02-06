import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationComponent } from './location.component';
import {LocationImpl} from '../locationImpl';

describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    const tempLoc = new LocationImpl();
    const tempLocArray = [];
    tempLocArray.push(tempLoc);
    component.location = tempLoc;
    tempLoc.name = 'Folsom';
    component.locations = tempLocArray;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('removes the zip from local storage when closing', () => {
    localStorage.setItem('storedZipCode' + '95630', '95630');
    component.handleClose();

    let found = false;
    for (const localStorageKey in localStorage) {
      if (localStorageKey.startsWith('storedZipCode')){
        if (localStorage.getItem(localStorageKey) === 'storedZipCode95630'){
          found = true;
        }
      }
    }
    expect(found ).toBeFalse();
  });


});
