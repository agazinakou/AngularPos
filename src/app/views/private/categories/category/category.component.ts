import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { FieldConfig } from 'ngx-nomad-form';
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
        validations: [{
          name: 'required',
          validator: Validators.required,
          message: 'Name is required'
        }, {
          name: 'pattern',
          validator: Validators.pattern('^[a-zA-Z]+$'),
          message: 'Accept only text'
        }]
      },{
        type: 'select',
        label: 'Status',
        name: 'status',
        value: this.category?.status ? 'enable' : 'disable',
        col: 6,
        options: ['enable', 'disable']
      },  {
        type: 'button',
        color: 'primary',
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
