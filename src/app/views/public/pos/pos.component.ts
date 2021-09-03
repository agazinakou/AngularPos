import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment';
import { Category, Product } from 'src/app/core/models';
import { FirebaseService, NotifyService } from 'src/app/core/services';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  products : any;
  content: any = null;
  basket: any = [];
  backup : any = [];
  cartTotal: number;
  cartNumItems: number;


  categories: any;

  constructor(
    private firestore : FirebaseService,
    private notify : NotifyService,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.products = [{
      id: 1,
      category: 'Food',
      icon : 'nav-home-tab',
      content : [{
        id: 1,
        name : 'Chicken',
        image : 'assets/img/chicken.jpeg',
        quantity : 1,
        price : 5,
        available : true,
        stock : 200,
      },{
        id: 1,
        name : 'fish',
        price : 2000,
        image : 'assets/img/chicken.jpeg',
        quantity: 1,
        available : true,
        stock : 10,
      }],
    },{
      id: 2,
      category: 'Drink',
      icon : 'nav-home-tab',
    }]
    this.content = this.products[0].content;

    this.firestore.getDocuments("category")
      .then((data) => {
        if (data.length === 0) {
          console.log(data);
        }
        else {
          console.log(data);
        }
      })
      .catch(err => {
        this.notify.error2("Oup's une erreur est survenu :(");
      });

      this.fetch();
  }

  fetch(){
    this.afs.collection('categories').valueChanges().subscribe((res : any) => {
      this.categories = res;
      console.log(this.categories);
        this.categories.forEach(async (element, key) => {
          this.categories[key].products = await this.findProducts(element.id);
        });
    });
  }

  async findProducts(category){
    return new Promise(resolve => {
      this.afs.collection('products', ref => ref.where('category', '==', category)).valueChanges().subscribe((res : any) => {
        resolve(res);
      });
    });
  }

  show(item){
    this.content = item.content;
  }

  panier(a){
    a = { quantity: 1, ...a }
    if(this.basket == '' || this.basket == null){
      this.backup.push(a);
      this.basket.push(a);
    } else {
      var isPresent = this.basket.some(function (el) { return el.name === a.name });
      console.log(isPresent);
      if(isPresent == false){
        this.backup.push(a);
        this.basket.push(a);
      }
    }
    this.calculateTotal();
  }

  /*add(x){
    x.quantity = x.quantity + 1;
    var isp = this.backup.some(function (el) {
      if (el.name === x.name ){
        var p = el.price;
        x.price = p * x.quantity;
        return x.price;
      }
    });

    console.log(isp);

  }*/

  add(x) {
    // If the item already exists, add 1 to quantity
    if (this.basket.includes(x)) {
      this.basket[this.basket.indexOf(x)].quantity += 1;
    } else {
      this.basket.push(x);
    }
    this.calculateTotal();
  }

  reduce(x) {
    // Check if last item, if so, use remove method
    if (this.basket[this.basket.indexOf(x)].quantity === 1) {
      this.remove(x);
    } else {
      this.basket[this.basket.indexOf(x)].quantity = this.basket[this.basket.indexOf(x)].quantity - 1;
    }
    this.calculateTotal();
  }

  remove(x) {
    // Check if item is in array
    if (this.basket.includes(x)) {
      // Splice the element out of the array
      const index = this.basket.indexOf(x);
      if (index > -1) {
        // Set item quantity back to 1 (thus when readded, quantity isn't 0)
        this.basket[this.basket.indexOf(x)].quantity = 1;
        this.basket.splice(index, 1);
      }
    }
    this.calculateTotal();
  }

  calculateTotal() {
    let total = 0;
    let cartitems = 0;
    // Multiply item price by item quantity, add to total
    this.basket.forEach(function (x) {
      total += (x.price * x.quantity);
      cartitems += x.quantity;
    });
    this.cartTotal = total;
    this.cartNumItems = cartitems;
  }

  // Remove all items from cart
  clearCart() {
    // Reduce back to initial quantity (1 vs 0 for re-add)
    this.basket.forEach(function (x) {
      x.quantity = 1;
    });
    // Empty local ticket variable then sync
    this.basket = [];
    this.calculateTotal();
  }

  checkout() {
    if (this.basket.length > 0) {
      //Pay
      console.log(this.basket);
      this.saveOrder(this.basket);
    } else {
      Swal.fire("Empty", "", "error");
    }
  }

  saveOrder(basket: any){
    console.log('add');
    let data = {
      id: this.afs.createId(),
      orderId: this.afs.createId(),
      carts: JSON.stringify(basket),
      amount: this.cartTotal,
      status: true,
      created_at: moment().format(),
      updated_at: moment().format()      
    };

    this.afs.collection("sales").doc(data.id).set(data).then(() => {
      Swal.fire("OK", "", "success").then(()=> location.reload());
    }, err => {
      this.notify.error2("Oup's une erreur est survenu :(");
    });
  }




}
