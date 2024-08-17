import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerTransferService {

  private baseUrl = 'http://localhost:8080/url/manager/request';
  private url = 'http://localhost:8080/url/manager';

  constructor(private http: HttpClient) {}

  getAllRequest() {
    return this.http.get(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addRequest(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  deleteRequest(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateRequest(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // confirmRequest(id: number, data: any) {
  //   return this.http.put(`${this.url}/confirm/${id}`, data);
  // }

  rejectRequest(id: number, data: any) {
    return this.http.put(`${this.url}/reject/${id}`, data);
  }

  countRequestManager(){
    return this.http.get(this.baseUrl+'/count')
  }
}
