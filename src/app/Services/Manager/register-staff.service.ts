import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterStaffService {

  private baseUrl='http://localhost:8080/url/staff';

  constructor(private http:HttpClient) { }

  getAllStaff(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id:number){
    return this.http.get(this.baseUrl+'/'+id)
  }

  addStaff(data:any){
    return this.http.post(this.baseUrl,data)
  }

  deleteStaff(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  updateStaff(id:number,data:any){
    return this.http.put(this.baseUrl+'/'+id,data)
  }



}
