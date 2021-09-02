import { Component } from '@angular/core';
import { User } from '../../models';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user: any;

  constructor(private authService: AuthenticationService) {
    this.user = this.authService.getUserData();
  }

}
