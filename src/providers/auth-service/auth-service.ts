import { Injectable } from '@angular/core';
import { Http, Headers ,RequestOptions} from '@angular/http';
import { Observable }  from 'rxjs/Rx';
import 'rxjs/RX';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()


export class AuthServiceProvider {
   token:string;
   private isLoggedIn = false;
  constructor(private _http: Http) {
    this.token = localStorage.getItem('token');
            
  }
  
  userLogin(email: string, password: string) : Observable<any> {
    this.isLoggedIn = true;
    let headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    });
    let options = new RequestOptions({
    headers: headers
    });
    let apiUrl = 'http://forevr.in/api/login';
      
    return this._http.post(apiUrl,JSON.stringify({ email: email, password: password }), options)
      .map(
        (res)=>{
          return res.json();
        }
      ).catch(e => {
          if (e.status === 401) {
              return Observable.throw('Unauthorized');
          }
      });  
    }

/* authUsers():Observable<any>{
  let headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization':'Bearer '+this.token 
 });
  let options = new RequestOptions({
      headers: headers
  });
   let getusers= 'http://forevr.in/api/details';
   
  return this._http.get(getusers,options)
    .map(res => {
        let data=res.json();
        console.log(data)
        return data.user;           
      }
    )
  } 
    */
  logout() {
      this.isLoggedIn = false;
      localStorage.removeItem('currentUser');
  }
  
  getToken() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const token = currentUser && currentUser.token;
      console.log(token);
      return this.token;
  }

  isAuthenticated() {
    console.log("into isAuth");
    console.log(this.token);
    console.log(this.token != null);
    return this.token != null;
  }

  postusers(name,email,password,c_password):Observable<any>{   
    let url='http://forevr.in/api/register'
    let headers = new Headers({ 
        'Authorization':'Bearer '+this.token 
    });
    let options = new RequestOptions({
    headers: headers
    });
  return this._http.post(url,{name:name,email:email,password:password,c_password:c_password},options)
  .map(res => {
      let data=res.json();
      return data.message;        
    }) 
  }
}
