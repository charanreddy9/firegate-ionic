import { Component ,OnInit } from '@angular/core';
import {  NavController, NavParams,ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})

export class SigninPage implements OnInit {
  token: string;
  email:string = 'charan.gangam9@gmail.com';
  password:string = '123456';  
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  constructor(
      public navCtrl: NavController,
      public toastCtrl: ToastController, 
      public navParams: NavParams, 
      private authServiceProvider:AuthServiceProvider) {

  }
  ngOnInit() {  
    this.authServiceProvider.logout(); 
  }
  
  onSignin(form:NgForm) {
    console.log(form);
    let email = form.value.email;
    let password = form.value.password;
    let connection= navigator.onLine;
    if(connection) {
      this.authServiceProvider.userLogin(email,password)
      .subscribe(
          results => {
            console.log(results);
            localStorage.setItem('token', results.token); 
            localStorage.setItem('email', email);
            this.navCtrl.push(TabsPage);
        }, (err) => {
            if (err === 'Unauthorized') { 
              this.toastCtrl.create({
              message: `Invalid Mail or Password.`,
              duration: 3000,
              position: 'top',
              cssClass: "error-toast",
            }).present();
          }    
        });  
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