import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions,ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ReportServiceProvider {
token:string;email:string;
  constructor(public http: Http,) {
     this.email = localStorage.getItem('email');
  }
  
 postdates(from_date,to_date):Observable<any>{
  let detailurl='http://forevr.in/api/download-pdf';
       let headers = new Headers({ 
        'Content-Type': 'application/json',
        'Accept': 'application/pdf',
        'Authorization':'Bearer '+this.token 
        });
        let options = new RequestOptions({ headers: headers });
        // Ensure you set the responseType to Blob.
        options.responseType = ResponseContentType.Blob;
        return this.http.post(detailurl,{from_date:from_date,to_date:to_date,email:this.email},options)
        .map(
            res => {
            let data=res.json();
            console.log(data);
            
          });   
      }
      
}

