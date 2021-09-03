import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment';
import { Product, Sale } from 'src/app/core/models';
import { FirebaseService, NotifyService } from 'src/app/core/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  sales : Sale[] = [];

  constructor(private firestore : FirebaseService, public notify : NotifyService, 
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.fetch();
  }

  refresh(){
    this.fetch();
  }

  fetch() {
    this.afs.collection('sales').valueChanges().subscribe((res : any) => {
      this.sales = res;
      console.log(this.sales);
    });
  }

  show(sale: Sale[]){
    
  }

  carts(cart: any){
    return JSON.parse(cart);
  }

}
