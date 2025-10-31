import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   readonly title = signal('ng-certification app is running!');
   constructor() {
    console.log('environment.production = ' + environment.production);
  }
}
