import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/core/models';
import { FirebaseService, NotifyService } from 'src/app/core/services';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  categories : any;
  products : Observable<Product>;
  state: any;

  constructor(private firestore : FirebaseService, public notify : NotifyService,
    private router : Router) {
    this.state = this.router.getCurrentNavigation().extras.state;
    if(this.state && this.state.reload) window.location.reload();
  }

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
