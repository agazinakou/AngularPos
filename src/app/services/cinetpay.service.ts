import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import swal from 'sweetalert';

declare var CinetPay;
@Injectable({
  providedIn: 'root'
})
export class CinetpayService {
  private CinetPay: any;

  private apikey: string = environment.cp.api_key;
  private site_id: number = environment.cp.site_id;
  private notify_url: string = environment.cp.notify_url;
  private currency: string = environment.cp.currency;
  private trans_id: any;
  private cpm_custom: any;
  private designation: any;

  private amount: number;

  constructor() { }

  seamless(am) {
    CinetPay.setConfig({
      apikey: this.apikey,
      site_id: this.site_id,
      notify_url: this.notify_url
    });
    //Lorsque la signature est généré
    CinetPay.on('signatureCreated', function (token) {
      console.log('Tocken généré: ' + token);
    });
    CinetPay.on('paymentPending', function (e) {

    });
    CinetPay.on('paymentSuccessfull', function (paymentInfo) {
      if (typeof paymentInfo.lastTime != 'undefined') {
        if (paymentInfo.cpm_result == '00') {
          swal({
            title: "Achat effectué avec succès",
            text: 'Votre paiement a été effectué avec succès : Montant : ' + paymentInfo.cpm_amount + ' FCFA' + " Merci d'avoir d'utiliser SportCash",
            icon: "success",
          }).then(function () {
            location.reload(true);
          });

        } else {
          swal("Erreur", "Paiement echoué", "error");
        }
      } else {
      }
    });

    CinetPay.setSignatureData({
      amount: am,
      trans_id: window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now(),
      currency: this.currency,
      designation: this.designation,
      custom: this.cpm_custom
    });

    CinetPay.getSignature();

  }

  tr(f) {
    this.designation = 'paiement de ' + f + 'avec le CinetPay-POS';
    this.seamless(f);
  }
}
