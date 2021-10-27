import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService, NotifyService } from 'src/app/core/services';
import { Product, Category } from 'src/app/core/models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products : Product[] = [];
  categories : Category[] = [];
  display: boolean = false;
  product : any;

  constructor(private firestore : FirebaseService, public notify : NotifyService,
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.fetch();
  }

  add(){
    this.product = [];
    this.display= true;
  }

  refresh(){
    this.fetch();
  }

  async fetch() {
    this.afs.collection('products').valueChanges().subscribe((res : any) => {
      this.products = res;
      console.log(this.products);
    });

    this.afs.collection('categories').valueChanges().subscribe((res : any) => {
      this.categories = res;
      this.products.forEach(async (element, key) => {
        this.products[key].category = await this.findCategory(element.category);
      });
    });
  }

  delete(id: string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.firestore.deleteDocument('products', id).then(val => {
          Swal.fire(
            'Deleted!',
            'This product has been deleted.',
            'success'
          );
          this.fetch();
        }, err => {
          this.notify.error2("Oup's une erreur est survenu :(");
        });
      }
    })
  }

  edit(product: Product[]){
    this.product = product;
    this.display = true;
  }

  saver(formData: any){
    if(!formData.isAddForm) {
      this.updateProduct(formData);
    } else {
      this.addProduct(formData);
    }
    this.display = false;
    this.product = [];
  }

  async findCategory(category_id: string){
    return new Promise((resolve, reject) => {
      this.afs.collection<Category>('categories').doc(category_id).ref.get().then((doc) => {
        if (doc.exists) {
            resolve(doc.data().name);
        } else {
            return 'Doc does not exits';
        }
    })
    .catch((err) => {
        console.error(err);
    });
    });
  }

  updateProduct(formData: any){
    let data = {
      name: formData.name,
      price: formData.price,
      stock: formData.stock,
      category: formData.category,
      status: formData.status == 'enable' ? true : false,
      updated_at: moment().format()
    };

    console.log(data);

    this.afs.doc<any>(`products/${formData.id}`).update(data).then(() => {
      this.fetch();
    }, err => {
      this.notify.error2("Oup's une erreur est survenu :(");
    });
  }

  addProduct(formData: any){
    console.log('add');
    let data = {
      id: this.afs.createId(),
      name: formData.name,
      price: formData.price,
      stock: formData.stock,
      category: formData.category,
      status: formData.status == 'enable' ? true : false,
      created_at: moment().format(),
      updated_at: moment().format()
    };

    this.afs.collection("products").doc(data.id).set(data).then(() => {
      this.fetch();
    }, err => {
      this.notify.error2("Oup's une erreur est survenu :(");
    });
  }
}
