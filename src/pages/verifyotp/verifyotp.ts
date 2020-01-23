import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import { AdhocServiceProvider } from '../../providers/adhoc-service/adhoc-service';
import { AdhocPage } from '../adhoc/adhoc';
import { OtpPage } from '../otp/otp';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-verifyotp',
  templateUrl: 'verifyotp.html',
})
export class VerifyotpPage {
errorOTP:any; mobile= (localStorage.getItem('mobile'));
  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public navParams: NavParams,public adhocServiceProvider:AdhocServiceProvider) {
  }
   verifyOtp(vOtp:NgForm){ 
    let connection= navigator.onLine;
    if(connection) {
    let otp = vOtp.value.otp;
    this.adhocServiceProvider.verifyOtp(otp)
    .subscribe(
        results => {   
          if(results.type === 'success') {
             this.navCtrl.push(AdhocPage);
              vOtp.form.reset();
          } else{
             this.errorOTP="Enter Valid OTP"
          } 
        }) 
  } 
   else{
        this.toastCtrl.create({
        message: `please check your connection`,
        duration: 3000,
        position: 'top',
        cssClass: "error-toast",
      }).present();
   }
   }
     backotp(){
     this.navCtrl.push(OtpPage); 
  } 
resend(){
      this.adhocServiceProvider.sendOtp(this.mobile)
    .subscribe(
        results => {  
         
        }) 
  
}
}


