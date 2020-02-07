import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../../services/firebase/firebase.service';
import { NotifyService } from '../../../../services/notify/notify.service';

import { Observable, of } from 'rxjs';
import { Product } from '../../../../interfaces/product';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  categories : any;
  products : Observable<Product>;

  constructor(private firestore : FirebaseService, public notify : NotifyService) { }

  ngOnInit() {
    this.firestore.getDocuments("category")
      .then((data) => {
        if (data.length !== 0) {
          this.categories = data;
        }
        else {
          console.log('Empty');
        }
      })
      .catch(err => {
        this.notify.error2("Oup's une erreur est survenu :(");
      });
      this.getProducts();
  }

  getProducts(){
    this.firestore.getDocuments("products")
    .then((data) => {
      if (data.length !== 0) {
        this.products = data;
        console.log(data);
      }
      else {
        console.log('Empty');
      }
    })
    .catch(err => {
      this.notify.error2("Oup's une erreur est survenu :(");
    });
  }

}
