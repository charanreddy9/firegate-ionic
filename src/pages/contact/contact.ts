import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {NgForm} from '@angular/forms';
import { ToastController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
data:any;adduser:any;errors:any;emailerror:any;
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public authServiceProvider:AuthServiceProvider) {

  }      

 postusers(adduser:NgForm){
   let connection= navigator.onLine;
   if(connection) {
    
    let name = adduser.value.name;
    let email = adduser.value.email;
    let password = adduser.value.password;
    let c_password=adduser.value.c_password;
    this.authServiceProvider.postusers(name,email,password,c_password)
    .subscribe(
      results => {
        this.data = results;
        this.toastCtrl.create({
        message: `User  Registered successfully`,
        duration: 3000,
        position: 'top',
        cssClass: "adhoctoast",
      }).present();
        // this.navCtrl.push(HomePage); 
        adduser.form.reset(); 
      },
      errors => {
        this.emailerror=errors
        console.log(this.emailerror)
      
      }) 
    } else {
        this.toastCtrl.create({
          message: `please check your connection`,
          duration: 3000,
          position: 'top',
          cssClass: "error-toast ",
        }).present();
    }
 }
 
}
