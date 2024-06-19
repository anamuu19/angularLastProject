import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitutionListService {
  private baseUrl='http://localhost:8080/url/institution'

  constructor(private http: HttpClient) { }

  getAllInst(): Observable<any[]> {
    // Assuming your API endpoint for fetching all institutions is '/api/institutions'
    return this.http.get<any[]>(this.baseUrl);
  }

  getInstById(id: number): Observable<any> {
    // Assuming your API endpoint for fetching an institution by ID is '/api/institutions/:id'
    return this.http.get<any>(this.baseUrl+'/'+id);
  }

  addInst(institutionData: any): Observable<any> {
    // Assuming your API endpoint for adding an institution is '/api/institutions'
    return this.http.post<any>(this.baseUrl, institutionData);
  }

  updateInstitution(id: number, institutionData: any): Observable<any> {
    // Assuming your API endpoint for updating an institution is '/api/institutions/:id'
    return this.http.put<any>(this.baseUrl+'/'+id, institutionData);
  }

  deleteInstitution(id: number): Observable<any> {
    // Assuming your API endpoint for deleting an institution by ID is '/api/institutions/:id'
    return this.http.delete<any>(this.baseUrl+'/'+id);
  }
}
