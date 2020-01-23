import { Component, OnInit } from '@angular/core';
import {App, NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AdhocServiceProvider } from '../../providers/adhoc-service/adhoc-service';
import { SigninPage } from '../signin/signin';
import { OtpPage } from '../otp/otp';
import { Network } from '@ionic-native/network';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  adhocs:string;
  data:string;
  search:any;
  mobile:any;
  myInput: boolean;
  rootPage:any;
  token: any;
  loggedIn: any = false;

  constructor(
      public app: App,
      public navCtrl: NavController,
      private network: Network,
      public toastCtrl: ToastController,
      private adhocServiceProvider:AdhocServiceProvider) {
        this.network.onConnect().subscribe((network) => {
          this.toastCtrl.create({
            message: `Network connected`,
            duration: 3000,
            position: 'top',
            
          }).present();
        });
        this.network.onDisconnect().subscribe((network) => {
            this.toastCtrl.create({
            message: `Network disconnected`,
            duration: 3000,
            position: 'top',
           
          }).present();
       });
    }
    
   ngOnInit() {
    if(this.isLoggedIn()) {      
    this.getAdhocs(); 
    } else {
    this.navCtrl.push(SigninPage);
    }
  }
  isLoggedIn() {
    let token = window.localStorage.getItem('token');
    if(token === undefined || token === null) {
      this.loggedIn = false;
      return this.loggedIn;
    }
    else {
      this.loggedIn = true;
      return this.loggedIn;
    }
  }

  showlogin() { 
    this.navCtrl.push(SigninPage); 
  }
  logout(){    
    this.app.getRootNav().setRoot(SigninPage);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('mobile');
    localStorage.removeItem('otp');
  }
  
  getAdhocs(){
    this.adhocServiceProvider.getAdhocs()
    .subscribe(
      data =>{
        this.adhocs=data;
        console.log(this.adhocs);
      }
    )
  } 
  Search(eve:any){
    let mobile=eve.target.value;
    console.log(mobile);
    this.adhocServiceProvider.Search(mobile)
    .subscribe(
      data =>{
        this.search=data;
       console.log(this.search)
      }
    )
  }
  adhocentry(){
     this.navCtrl.push(OtpPage); 
  }
  
  //logout from school not auth
  Logout(id){
    this.adhocServiceProvider.Logout(id)
    .subscribe(
      data =>{
        this.toastCtrl.create({
        message: `visitor existed successfully`,
        duration: 3000,
        position: 'top',
        cssClass: "adhoctoast",
        
      }).present();
       this.navCtrl.setRoot(HomePage);
      }
    )
  }
 
}
