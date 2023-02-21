import { Component } from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  title = 'ng-certification app is running!';

  constructor() {
    console.log('environment.production = ' + environment.production);
  }

}
