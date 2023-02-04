import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationComponent } from './location.component';
import {LOCATIONS} from '../mock-data';

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
    component.location = LOCATIONS[0];
    component.locations = LOCATIONS;
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
