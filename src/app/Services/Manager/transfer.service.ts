import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private baseUrl='http://localhost:8080/url/request';
  private url='http://localhost:8080/url';
  private letterUrl = 'http://localhost:8080/api/letter';
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

  confirmRequest(id: number, data: any) {
    return this.http.put(`${this.url}/confirm/${id}`, data);
  }
  countRequest(){
    return this.http.get(this.baseUrl+'/count')
  }
  // downloadConfirmationLetter(id:number){
  //   return this.http.get(this.baseUrl+"/"+id)
  // }
  // downloadLetter(requestId: number, institutionId: number) {
  //   const url = `${this.letterUrl}/individual-letter/${requestId}/${institutionId}`;
  //   return this.http.get(url, {
  //     responseType: 'blob',
  //     headers: new HttpHeaders().append('accepted', 'application/pdf')
  //   });
  // }
}
