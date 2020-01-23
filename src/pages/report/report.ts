import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import { ReportServiceProvider } from '../../providers/report-service/report-service';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'report.html'
})
export class ReportPage {
data:any;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public reportServiceProvider:ReportServiceProvider) {

  }
postdates(todates:NgForm){
   let connection= navigator.onLine;
   if(connection) {
      let from_date = todates.value.from_date;
      let to_date = todates.value.to_date;
  
    
    this.reportServiceProvider.postdates(from_date,to_date)
    .subscribe(
      results => {
        this.data = results;
       this.toastCtrl.create({
        message: `Report Forwarded To Your Email`,
        duration: 3000,
        position: 'top',
        cssClass: "success-toast",
      }).present();
      todates.form.reset();
      },
      errors => {
        this.data = errors;
       
      }) 
   }
   else {
     this.toastCtrl.create({
            message: `please check your connection`,
            duration: 3000,
            position: 'top',
            cssClass: "error-toast",
            }).present();
   }
   
}

}
