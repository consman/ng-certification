import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
   readonly title = signal('ng-certification app is running!');
  constructor() {
    console.log('environment.production = ' + environment.production);
  }
}
