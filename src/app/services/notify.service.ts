import { Injectable } from '@angular/core';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  error(x){
    swal({
      title: x.code,
      text: x.message,
      icon: "error",
    });
  }

  error2(a : string){
    swal({
      title: "Oup's",
      text: a,
      icon: "error",
    });
  }
}
