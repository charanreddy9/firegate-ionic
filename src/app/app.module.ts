import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { ReportPage } from '../pages/report/report';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';

import { OtpPage } from '../pages/otp/otp';
import { VerifyotpPage } from '../pages/verifyotp/verifyotp';
import { AdhocServiceProvider } from '../providers/adhoc-service/adhoc-service';
import { AdhocPage } from '../pages/adhoc/adhoc';
import { Camera } from '@ionic-native/camera';
import { ReportServiceProvider } from '../providers/report-service/report-service';
import { CustomFormsModule } from 'ng2-validation'
import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
    ReportPage,
    ContactPage,
    HomePage,
    TabsPage,SignupPage,SigninPage,AdhocPage,OtpPage,VerifyotpPage
  ],
  imports: [
    BrowserModule, CustomFormsModule,
    IonicModule.forRoot(MyApp),HttpModule, FormsModule, ReactiveFormsModule,IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ReportPage,
    ContactPage,
    HomePage,
    TabsPage,
    SigninPage,
    SignupPage,AdhocPage,OtpPage,VerifyotpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    AdhocServiceProvider,
    ReportServiceProvider,Network
    
  ]
})
export class AppModule {}
