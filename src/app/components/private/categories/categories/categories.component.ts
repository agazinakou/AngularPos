import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseService } from '../../../../services/firebase/firebase.service';
import { NotifyService } from '../../../../services/notify/notify.service';

import { Observable, of } from 'rxjs';
import { Category } from '../../../../interfaces/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef

  categories : Observable<Category>;

  categoryForm: FormGroup;
  submitted = false;
  loading: boolean = false;

  constructor(private firestore : FirebaseService, public notify : NotifyService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      status: [false]
    });

    console.log(moment().format());
    this.fetch();
  }

  fetch(){
    this.firestore.getDocuments("categories")
      .then((data) => {
        if (data.length !== 0) {
          this.categories = data;
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

  // convenience getter for easy access to form fields
  get f() { return this.categoryForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.categoryForm.invalid) {
      console.log(1);
      return;
    } else {
      this.add(this.categoryForm.value);
    }

  }

  add(category){
    if(!this.loading){
      this.loading = true;
      console.log(category);
      this.saveCategory(category);
    }
  }

  saveCategory(category){

    let data = {
      name: category.name,
      status: category.status,
      created_at: moment().format(),
      updated_at: moment().format()
    };

    this.firestore.addDocument('categories', data).then(val => {
      this.fetch();
      this.closeModal.nativeElement.click();
    }, err => {
      this.notify.error2("Oup's une erreur est survenu :(");
    });

    this.loading = false;

  }

  checkIfExist(){

  }

  delete(id){
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


}
