import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { NotifyService } from '../../../services/notify/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, 
    private AuthenticationService: AuthenticationService, 
    private router: Router,
    private notify : NotifyService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.auth(this.loginForm.value);
    }

  }

  private auth(a){
    this.loading = !this.loading;
    this.AuthenticationService.loginUser(a.email, a.password).then(a=>{
      this.router.navigate(['admin', 'dashboard']);
    }, err=> {
      this.loading =  !this.loading;
      this.notify.error(err);
      console.log(err);
    })
  }
}