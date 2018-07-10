import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  settingsForm: FormGroup;
  submitted = false;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  public getPrices() {
    this.apiService.get("price").subscribe((resp) => {
      console.log(resp);
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.settingsForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      secteur: ['', Validators.required],
      company: ['', Validators.required],
      logo: ['', Validators.required],
    });
  }

  get f() { return this.settingsForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.settingsForm.invalid) {
      return;
    }
    else {
      alert("ok");
    }
  }

}

