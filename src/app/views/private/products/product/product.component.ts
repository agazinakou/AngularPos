import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validators } from '@angular/forms';
import { FieldConfig, FormConfig } from 'ngx-nomad-form';
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

  formConfig: FormConfig = {
    name: 'productForm',
    enctype: 'text/plain',
  };

  constructor(private afs: AngularFirestore) {}

  ngOnInit(){
    this.afs.collection('categories').valueChanges().subscribe((res : any) => {
      this.categories = [];
      res.forEach((element) => {
       this.categories.push({
         'label': element.name,
         'value': element.id
        });
      });
    });

    this.isAddForm = this.product?.name ? false : true;

    this.fields = [
      {
        type: 'input',
        label: 'Name',
        inputType: 'text',
        name: 'name',
        col: 12,
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
        col: 12,
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
        col: 12,
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
        col: 12,
        options: []
      },{
        type: 'select',
        label: 'Status',
        name: 'status',
        value: this.product?.status ? 'enable' : 'disable',
        col: 12,
        options: [
          {
            label: 'Enable',
            value: true
          },{
            label: 'Disable',
            value: false
          }
        ]
      },{
        type: 'button',
        color: 'primary',
        label: this.product.name ? 'Update' : 'Save',
        col: 12
      }
    ];
    setTimeout(() => {
      this.fields[3].options = this.categories;
      this.fields[3].value = this.product?.category;
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
