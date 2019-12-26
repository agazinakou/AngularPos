import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AnglularPOS';

  active : boolean = false;
  route : string;

  constructor(public location: Location, public router : Router) {
    router.events.subscribe((val) => {
      if(location.path() != ''){
        this.route = location.path();
        if (this.route.indexOf('admin') > -1) {
          this.active = true;
        } else {
          this.active = false;
        }
      } else {
        this.route = 'home';
      }
    });
  }

  ngOnInit() {
  }

}
