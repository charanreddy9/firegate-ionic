import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import {NgForm} from '@angular/forms';
import { HomePage } from '../home/home';
import { AdhocServiceProvider } from '../../providers/adhoc-service/adhoc-service';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-adhoc',
  templateUrl: 'adhoc.html',
})
export class AdhocPage {
  public base64Image: string;data:any;addAdhoc:any;
  mobile= (localStorage.getItem('mobile'));
  otp= (localStorage.getItem('otp'));disableButton:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,private camera: Camera,public adhocServiceProvider:AdhocServiceProvider ) {
}

 takePicture(){
    this.camera.getPicture({
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 200,
        targetHeight: 130,
        correctOrientation: true
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/JPEG;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
}
 postAdhoc(addAdhoc:NgForm){
  this.disableButton=true;
   let connection= navigator.onLine;
   if(connection) {
   let name = addAdhoc.value.personname;
   let gender = addAdhoc.value.gender;
   let person = addAdhoc.value.person;
   let purpose = addAdhoc.value.purpose;
   let comment = addAdhoc.value.comment;
   let dataURL= this.base64Image;

    this.adhocServiceProvider.postAdhoc(name,gender,person,purpose,comment,dataURL)
    .subscribe(
      results => {
       this.data = results;
       this.toastCtrl.create({
        message: `visitor was Registered successfully`,
        duration: 3000,
        position: 'top',
        cssClass: "adhoctoast",
      }).present();
         //this.navCtrl.push(HomePage); 
          this.navCtrl.setRoot(HomePage);
         addAdhoc.form.reset(); 
      },
      errors => {
        this.data = errors;
       
      }) 
      
  }else {
     //localStorage.setItem('mobile', this.data);
     this.toastCtrl.create({
      message: `please check your connection`,
      duration: 3000,
      position: 'top',
      cssClass: "error-toast",
    }).present();
  }
 }
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
  
}
