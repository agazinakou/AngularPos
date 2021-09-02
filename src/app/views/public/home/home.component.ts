import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuth: boolean = false;

  constructor(private auth : AuthenticationService, public router : Router) {
  }

  ngOnInit() {
    this.checkAuth();
  }

  dashboard(){
    this.router.navigate(['admin', 'dashboard']);
  }

  async checkAuth(){
    const status = await this.auth.checkIfUserIsConnected();
    console.log(status);
    status ? this.isAuth = true : this.isAuth = false;
  }

}
