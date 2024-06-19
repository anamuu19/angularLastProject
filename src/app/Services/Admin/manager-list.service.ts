import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerListService {
  private baseUrl='http://localhost:8080/url/manager'

  constructor(private http: HttpClient) { }

  getAllManager() {

    return this.http.get(this.baseUrl);
  }

  getManagerById(id: number){

    return this.http.get(this.baseUrl+'/'+id);
  }

  addManager(managerData: any){
    return this.http.post(this.baseUrl, managerData);
  }

  updateManager(id: number, managerData: any){
    return this.http.put(this.baseUrl+'/'+id, managerData);
  }

  deleteManager(id: number){
    return this.http.delete(this.baseUrl+'/'+id);
  }
}
