import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Category } from 'src/app/core/models';
import { FirebaseService, NotifyService } from 'src/app/core/services';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories : Category[] = [];
  display: boolean = false;
  category : any;

  constructor(private firestore : FirebaseService, public notify : NotifyService, 
    private afs: AngularFirestore) { }

  ngOnInit() {
    this.fetch();
  }

  add(){
    this.category = [];
    this.display= true;
  }

  refresh(){
    this.fetch();
  }

  fetch() {
    this.afs.collection('categories').valueChanges().subscribe((res : any) => {
      this.categories = res;
      console.log(this.categories);
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
        this.firestore.deleteDocument('categories', id).then(val => {
          Swal.fire(
            'Deleted!',
            'This category has been deleted.',
            'success'
          );
          this.fetch();
        }, err => {
          this.notify.error2("Oup's une erreur est survenu :(");
        });
      }
    })
  }

  edit(category: Category[]){
    this.category = category;
    this.display = true;
  }

  saver(formData: any){
    if(!formData.isAddForm) {
      this.updateCategory(formData);
    } else {
      this.addCategory(formData);
    }
    this.display = false;
    this.category = [];
  }

  updateCategory(formData: any){
    console.log('update');
    let data = {
      name: formData.name,
      status: formData.status == 'enable' ? true : false,
      updated_at: moment().format()
    };

    this.afs.doc<any>(`categories/${formData.id}`).update(data).then(() => {
      this.fetch();
    }, err => {
      this.notify.error2("Oup's une erreur est survenu :(");
    });
  }

  addCategory(formData: any){
    console.log('add');
    let data = {
      id: this.afs.createId(),
      name: formData.name,
      status: formData.status == 'enable' ? true : false,
      created_at: moment().format(),
      updated_at: moment().format()
    };

    this.afs.collection("categories").doc(data.id).set(data).then(() => {
      this.fetch();
    }, err => {
      this.notify.error2("Oup's une erreur est survenu :(");
    });
  }

}
