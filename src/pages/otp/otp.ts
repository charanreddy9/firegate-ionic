import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AdhocServiceProvider } from '../../providers/adhoc-service/adhoc-service';
import {NgForm} from '@angular/forms';
import { VerifyotpPage } from '../verifyotp/verifyotp';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {
  errornum:any;smsOtp:any;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams,public adhocServiceProvider:AdhocServiceProvider) {
  }

  

  sendOtp(smsOtp:NgForm){
    let connection= navigator.onLine;
    if(connection) {
      let mobile = smsOtp.value.mobile;
      localStorage.setItem('mobile', mobile);
      this.adhocServiceProvider.sendOtp(mobile)
      .subscribe(
          results => {  
            if(results.type === 'success') {
              
              this.navCtrl.push(VerifyotpPage);
              smsOtp.form.reset();
            } else{
              
              this.errornum="Enter Valid Mobile Number"
            } 
          }) 
          
      } else {
        this.toastCtrl.create({
        message: `please check your connection`,
        duration: 3000,
        position: 'top',
        cssClass: "error-toast",
      }).present();
      }
  } 
}
