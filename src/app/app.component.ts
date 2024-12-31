import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-certification app is running!';
  constructor() {
    //console.log('environment.production = ' + environment.production);
  }
}
