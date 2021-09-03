import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  state: any;
  
  categories : number;
  products : number;
  sales: number;

  constructor(private afs: AngularFirestore, private router : Router) {
    this.state = this.router.getCurrentNavigation().extras.state;
    if(this.state && this.state.reload) window.location.reload();
  }

  ngOnInit() {
    this.afs.collection('sales').valueChanges().subscribe((res : any) => {
      this.sales = res.length;
    });

    this.afs.collection('products').valueChanges().subscribe((res : any) => {
      this.products = res.length;
    });

    this.afs.collection('categories').valueChanges().subscribe((res : any) => {
      this.categories = res.length;
    });
  }

}
