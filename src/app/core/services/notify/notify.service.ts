import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  error(x){
    Swal.fire({
      title: x.code,
      text: x.message,
      icon: "error",
    });
  }

  error2(a : string){
    Swal.fire({
      title: "Oup's",
      text: a,
      icon: "error",
    });
  }
}
