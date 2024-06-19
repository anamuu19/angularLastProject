import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // loginUrl: String = '';
  // registerUrl: String = '';
  loginUrl = 'http://localhost:8080/auth/login';
  registerUrl = 'http://localhost:8080/auth/register';
  userUrl = 'http://localhost:8080/auth/getAll';
  countUrl = 'http://localhost:8080/auth/count';
  countInstUrl = 'http://localhost:8080/url/institution/count';

  constructor(private http: HttpClient) {


  }

  login(user: User): Observable<any> {
    return this.http.post(this.loginUrl, user);
  }
  registration(user:User){
    return this.http.post(this.registerUrl,user)

  }

  // getUser(data:any){

  //   return this.http.get(`${this.baseUrl}?username=${data.username}&password=${data.password}`)

  // }

  getAll() {
    return this.http.get(this.userUrl);
  }

  count(){
    return this.http.get(this.countUrl)
  }

  countInst(){
    return this.http.get(this.countInstUrl)
  }

  // addUser(data: any) {
  //   return this.http.post(this.baseUrl, data);
  // }

  // updateUser(data: any, id: any) {
  //   return this.http.put(`${this.baseUrl}/${id}`, data);
  // }
  // getUserRole(){
  //   return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  // }
  // getAllRole(){
  //   return this.http.get('http://localhost:3000/role');
  // }
}
