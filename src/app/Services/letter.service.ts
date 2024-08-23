import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LetterService {

  // private letterUrl = 'http://localhost:8080/api/letter';
  // private requestUrl = 'http://localhost:8080/api/request'; // Update with your backend URL

  // constructor(private http: HttpClient) { }

  // downloadLetter(requestId: number, institutionId: number): Observable<Blob> {
  //   const url = `${this.letterUrl}/individual-letter/${requestId}/${institutionId}`;
  //   return this.http.get(url, { responseType: 'blob' });
  // }

  // getAcceptedRequests(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.requestUrl}/accepted`); // Assuming this endpoint returns accepted requests
  // }
}
