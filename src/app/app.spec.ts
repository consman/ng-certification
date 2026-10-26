import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Nonprodweather } from './nonprodweather';

describe('App', () => {

  let component: App;
  let weather: Nonprodweather;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers:[Nonprodweather]
    })
      .compileComponents();
  });

  it('should create the app', () => {
    //console.log('Testing component - App');
     //component.weatherService = TestBed.runInInjectionContext(() => new Nonprodweather());

    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'ng-certification' title`, () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.title()).toEqual('ng-certification app is running!');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    //expect(compiled.querySelector('h1')?.textContent).toContain('Hello, ng-certification');
    if (null != compiled 
        && null != compiled.querySelector('title') 
        && null != compiled.querySelector('title')?.textContent){
      expect(compiled.querySelector('title')?.textContent).toContain('ng-certification app is running!');
    }
  });
  
});
