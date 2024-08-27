import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private baseUrl='http://localhost:8080/url/request';
  private url='http://localhost:8080/url';
  // private letterUrl = 'http://localhost:8080/api/letter';
  constructor(private http:HttpClient) { }

  getAllRequest(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
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
  acceptRequest(requestId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/requests/${requestId}/accept`, {});
  }

  rejectRequest(id: number, request: any): Observable<any> {
    const url = `${this.url}/reject/${id}`;
    return this.http.put(url, request, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

}
