import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the AdhocServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdhocServiceProvider {
 token:string;res:any=[];mobile:string;otp:string;error:any;

        
  constructor(public _http:Http) {
      this.token = localStorage.getItem('token');
      this.mobile= localStorage.getItem('mobile');
      this.mobile= localStorage.getItem('otp');
  }
 getAdhocs():Observable<any>{
        let detailurl='http://forevr.in/api/showadhoc';
        let headers = new Headers({ 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization':'Bearer '+this.token 
        });
        let options = new RequestOptions
        ({
          headers: headers
        });
        return this._http.get(detailurl,options)
        .map(
            res => {
               let data= res.json()
               return data.adhoc
            }
        )
    }
  Search(mobile):Observable<any>{
        let  searchurl='http://forevr.in/api/search/'+ mobile;
        let headers = new Headers({ 
            'Content-Type': 'application/json',
        'Authorization':'Bearer '+this.token 
        });
        let options = new RequestOptions
        ({
          headers: headers
        });
        return this._http.get(searchurl,options)
        .map(
            res => {
                let data= res.json()
               return data.search
            }
        )
    }
    postAdhoc(name,gender,person,purpose,comment,dataURL):Observable<any>{   
        let url='http://forevr.in/api/insertadhoc'
        const mobile = (localStorage.getItem('mobile'));
        const otp = (localStorage.getItem('otp'));
        let headers = new Headers({ 
            'Authorization':'Bearer '+this.token 
        });
        let options = new RequestOptions({
        headers: headers
    });
        return this._http.post(url,{name:name,gender:gender,mobile:mobile,otp:otp,person:person,purpose:purpose,comment:comment,pic:dataURL},options)
        .map(res => {
            let data=res.json();
            return data.message;        
         }) 
    }
     sendOtp(mobile):Observable<any>{   
        let smsurl='http://forevr.in/api/message'
        localStorage.setItem('mobile', mobile);
        let headers = new Headers({ 
            'Authorization':'Bearer '+this.token   
             });
        let options = new RequestOptions({
        headers: headers
             });
        return this._http.post(smsurl,{mobile:mobile},options)
        .map(res => {
            return res.json(); 
           
         })
         
          
    } 
    verifyOtp(otp):Observable<any>{   
        const mobile = (localStorage.getItem('mobile'));
         localStorage.setItem('otp', otp);
        console.log(mobile);
        let verifyotp='http://forevr.in/api/verifyotp'
        let headers = new Headers({ 
            'Authorization':'Bearer '+this.token ,
           
                });
        let options = new RequestOptions({
        headers: headers
                });
        return this._http.post(verifyotp,{otp:otp, mobile:mobile},options)
        .map(res => {
            return res.json(); 
            
            })
           
    }
Logout(id):Observable<any>{
        let  logouturl='http://forevr.in/api/edit/'+ id;
        let headers = new Headers({ 
            'Content-Type': 'application/json',
        'Authorization':'Bearer '+this.token 
        });
        let options = new RequestOptions
        ({
          headers: headers
        });
        return this._http.get(logouturl,options)
        .map(
            res => {
                let data= res.json()
               return data;
            }
        ) 
    }


}
