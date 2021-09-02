import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public auth : AuthenticationService, public router : Router) { }

  ngOnInit() {
    console.log('sidebar');
  }

  categories(){
    this.router.navigate(['admin', 'categories']);
  }

  logOut(){
    this.auth.signOut();
  }

}
