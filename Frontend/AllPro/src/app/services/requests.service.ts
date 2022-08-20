import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  API: string = 'https://localhost:44360/';

  constructor(private http: HttpClient) { }
  
  newSession(userData: any):Observable<any> {
    return this.http.get(this.API, userData);
  }

}
