import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'ngx-nomad-form';
import { Category } from 'src/app/core/models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: any;
  @Input() display: boolean = false;
  @Output() call = new EventEmitter<any>();
  
  categories: any[] = [];


  isAddForm: boolean = false;

  //My fields
  fields: FieldConfig[] = [];

  constructor(private afs: AngularFirestore) {}

  ngOnInit(){
    this.afs.collection('categories').valueChanges().subscribe((res : any) => {
      this.categories = [];
      res.forEach((element, key) => {
       this.categories.push(key + ' - ' +element.name);
      });
    });

    this.isAddForm = this.product?.name ? false : true;
     
    this.fields = [
      {
        type: 'input',
        label: 'Name',
        inputType: 'text',
        name: 'name',
        value: this.product?.name,
        validations: [{
          name: 'required',
          validator: Validators.required,
          message: 'Name is required'
        }]
      },{
        type: 'input',
        label: 'Price',
        inputType: 'number',
        name: 'price',
        value: this.product?.price,
        validations: [{
          name: 'required',
          validator: Validators.required,
          message: 'price is required'
        }]
      },{
        type: 'input',
        label: 'Stock',
        inputType: 'number',
        name: 'stock',
        value: this.product?.stock,
        validations: [{
          name: 'required',
          validator: Validators.required,
          message: 'stock is required'
        }]
      },{
        type: 'select',
        label: 'Category',
        name: 'category',
        value: this.product?.category,
        col: 6,
        options: []
      },{
        type: 'select',
        label: 'Status',
        name: 'status',
        value: this.product?.status ? 'enable' : 'disable',
        col: 6,
        options: ['enable', 'disable']
      },{
        type: 'button',
        color: 'primary',
        label: this.product.name ? 'Update' : 'Save'
      }
    ];
    setTimeout(() => {
      this.fields[3].options = this.categories;
    }, 2000);


  }

  callBack(formData: any){
    console.log(formData);
    this.call.emit({
      'id' : this.product?.id,
      'isAddForm' : this.isAddForm,
      ...formData
    });
  }

}
