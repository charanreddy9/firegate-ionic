import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {  Nav, Platform } from 'ionic-angular';
import { SigninPage } from '../pages/signin/signin';
import { TabsPage } from '../pages/tabs/tabs';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
 
 @ViewChild(Nav) nav: Nav;

 pages: any[] = [
    { title: 'Signin', component: 'SigninPage' },
    { title: 'Tabs', component: 'TabsPage' },
   
  ]
  constructor(public platform: Platform,public statusBar: StatusBar,public splashScreen: SplashScreen) {
    this.initializeApp();
    const auth = localStorage.getItem('token');
    if (auth) {
      this.rootPage = TabsPage;
    } else {
      this.rootPage = SigninPage;
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  showlogin() {
    this.nav.push(SigninPage);   
  }
  logout(){
   
    this.nav.setRoot(SigninPage);
    window.localStorage.removeItem('email');
    window.localStorage.removeItem('mobile');
    window.localStorage.removeItem('otp');
    window.localStorage.removeItem('token');
  } 
}
