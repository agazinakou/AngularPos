import { Product } from './../../../interfaces/product';
import { NotifyService } from './../../../services/notify/notify.service';
import { Category } from './../../../interfaces/category';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase/compat';


import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { FirebaseService } from '../../../services/firebase/firebase.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef

  categories : Observable<Category>;
  products : Observable<Product>;

  productForm: FormGroup;
  submitted = false;
  loading: boolean = false;
  seletedFile: any;

  constructor(private firestore : FirebaseService, public notify : NotifyService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, Validators.required],
      quantity: [1],
      stock: [1, [Validators.required, Validators.minLength(1)]],
      image: ['', Validators.required],
      category: ['', Validators.required],
      available: [false],
    });

    console.log(moment().format());
    this.fetch();
    this.fetchCategory();
  }

  fetchCategory(){
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

  fetch(){
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

  // convenience getter for easy access to form fields
  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
      console.log(1);
      return;
    } else {
      this.add(this.productForm.value);
    }

  }

  add(product){
    if(!this.loading){
      this.loading = true;
      //alert(category);
      this.saveCategory(product);
    }
  }

  onFileChanged(event) {
    console.log(URL.createObjectURL(event.target.files[0]));
    this.seletedFile = URL.createObjectURL(event.target.files[0]);

  }

  file(){
    var file = this.seletedFile;

    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = firebase.storage().ref().child('images/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error : any) {
        console.log(error);
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
      });
    });

  }

  async saveCategory(product){
    //var mountainImagesRef = firebase.storage().ref().child('images/mountains.jpg').put(this.seletedFile);
    await this.file();
    //alert(mountainImagesRef);

    let data = {
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      stock: product.stock,
      image: product.image,
      category: firebase.firestore().doc(`/categories/${product.category}`),
      available: product.available,
      created_at: moment().format(),
      updated_at: moment().format()
    };

    this.firestore.addDocument('products', data).then(val => {
      this.fetch();
      this.closeModal.nativeElement.click();
    }, err => {
      console.log(err);
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
        this.firestore.deleteDocument('products', id).then(val => {
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
