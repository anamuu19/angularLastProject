import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private baseUrl='http://localhost:8080/url/request';
  constructor(private http:HttpClient) { }

  getAllRequest(){
    return this.http.get(this.baseUrl)
  }
  getById(id:number){
    return this.http.get(this.baseUrl+'/'+id)
  }
  addRequest(data:any){
    return this.http.post(this.baseUrl,data)
  }

  deleteRequest(id:number){
    return this.http.delete(this.baseUrl+'/'+id)
  }

  updateRequest(id:number,data:any){
    return this.http.put(this.baseUrl+'/'+id,data)
  }
}
