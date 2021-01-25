import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FivedayforecastComponent } from './fivedayforecast.component';

describe('FivedayforecastComponent', () => {
  let component: FivedayforecastComponent;
  let fixture: ComponentFixture<FivedayforecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FivedayforecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FivedayforecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
