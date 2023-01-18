import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  baseUrl = 'http://localhost:8000/api/v1/';
  constructor(private http: HttpClient) {}
  get(url: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${url}`);
  }
}
