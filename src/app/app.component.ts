import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  on: boolean = false;
  route: string;

  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      if (location.path() == '' || location.path() == '/signup') {
        this.on = false;
      } else {
        this.on = true;
      }
    });
  }
}
