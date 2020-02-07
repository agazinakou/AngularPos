import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public auth : AuthenticationService, public router : Router) { }

  ngOnInit() {
  }
  
  categories(){
    this.router.navigate(['admin', 'categories']);
  }

  logOut(){
    this.auth.signOut();
  }

}
