import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/auth/user';

  constructor(private http: HttpClient) { }

  getUserById(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${email}`);
  }

  updateUser(email: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/put/${email}`, userData);
  }

  deleteUser(email: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${email}`);
  }
}
