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
    if(location.path() == ''){
      this.router.navigate(['home']);
    }
  }

}
