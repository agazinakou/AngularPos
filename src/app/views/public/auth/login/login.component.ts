import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldConfig, FormConfig } from 'ngx-nomad-form';
import { AuthenticationService, NotifyService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formConfig: FormConfig = {
    name: 'loginForm',
    enctype: 'text/plain',
  };

  //My fields
  fields: FieldConfig[] = [{
    type: 'input',
    label: 'Email address',
    inputType: 'email',
    name: 'email',
    value: 'agazinakou@gmail.com',
    col: 12,
    validations: [{
      name: 'required',
      validator: Validators.required,
      message: 'Email is required'
    }]
  },{
    type: 'input',
    label: 'Password',
    inputType: 'password',
    name: 'password',
    value: 'valar_dohaeris',
    col: 12,
    validations: [{
      name: 'required',
      validator: Validators.required,
      message: 'Password is required'
    }]
  },  {
    type: 'button',
    color: 'primary',
    label: 'login',
    col: 12
  }];

  constructor(private formBuilder: FormBuilder,
    private AuthenticationService: AuthenticationService,
    private router: Router,
    private notify : NotifyService) { }

  ngOnInit() {
    var r = this.AuthenticationService.checkIfUserIsConnected();
    r ? this.redirect() : null;
  }

  callBack(formData: any){
    this.auth(formData);
  }

  private auth(formData){
    console.log(formData);
    this.AuthenticationService.loginUser(formData.email, formData.password).then((res: any)=> {
      console.log('user', res);
      this.redirect();
    }, err=> {
      this.notify.error(err);
      console.log(err);
    })
  }

  redirect(){
    this.router.navigateByUrl('admin/dashboard', {
      state: {reload: true}
  });
 }
}
