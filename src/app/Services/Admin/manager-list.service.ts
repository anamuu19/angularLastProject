import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerListService {
  private baseUrl='http://localhost:8080/url/manager'
  // handleError: any;

  constructor(private http: HttpClient) { }

  getAllManager() {
    return this.http.get(this.baseUrl);
  }

  getManagerById(id: number){
    return this.http.get(this.baseUrl+'/'+id);
  }

  addManager(managerData: any): Observable<any> {
    return this.http.post(this.baseUrl,managerData)
  }
  // addManager(managerData: any): Observable<any> {
  //   return this.http.post(this.baseUrl, managerData).pipe(
  //     catchError(this.handleError.bind(this))
  //   );
  // }



  updateManager(id: number, managerData: any){
    return this.http.put(this.baseUrl+'/'+id, managerData);
  }

  deleteManager(id: number){
    return this.http.delete(this.baseUrl+'/'+id);
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    // Customize the error handling as per your needs
    return throwError('Something went wrong; please try again later.');
  }
}
