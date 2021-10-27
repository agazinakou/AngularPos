import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig, FormConfig } from 'ngx-nomad-form';
import { Category } from 'src/app/core/models';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() category: any;
  @Input() display: boolean = false;
  @Output() call = new EventEmitter<any>();

  isAddForm: boolean = false;

  //My fields
  fields: FieldConfig[] = [];

  formConfig: FormConfig = {
    name: 'categoryForm',
    enctype: 'text/plain',
  };

  constructor() { }

  ngOnInit(){
    this.isAddForm = this.category?.name ? false : true;

    this.fields = [
      {
        type: 'input',
        label: 'Name',
        inputType: 'text',
        name: 'name',
        value: this.category?.name,
        col: 12,
        validations: [{
          name: 'required',
          validator: Validators.required,
          message: 'Name is required'
        }]
      },{
        type: 'select',
        label: 'Status',
        name: 'status',
        col: 12,
        value: this.category?.status ? 'enable' : 'disable',
        options: [
          {
            label: 'Enable',
            value: true
          },{
            label: 'Disable',
            value: false
          }
        ]
      },  {
        type: 'button',
        color: 'primary',
        col: 12,
        label: this.category.name ? 'Update' : 'Save'
      }
    ];
  }

  callBack(formData: any){
    console.log(formData);
    this.call.emit({
      'id' : this.category?.id,
      'isAddForm' : this.isAddForm,
      ...formData
    });
  }

}
