import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var element = document.body;
    element.classList.remove("angularPos");
  }

}
