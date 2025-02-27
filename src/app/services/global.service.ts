import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userInterface } from '../interface/userInterface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  baseUrl = 'http://localhost:8000/api/v1/';
  currentUserInfo: userInterface = {
    fName: '',
    lName: '',
    email: '',
    age: 18,
    phone: [],
    role: {},
  };
  isLogin = false;
  constructor(private http: HttpClient) {}
  get(url: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${url}`);
  }
  post(url: string, data: any, headers: any = {}) {
    if (Object.keys(headers).length > 0)
      return this.http.post<any>(`${this.baseUrl}${url}`, data, headers);
    return this.http.post<any>(`${this.baseUrl}${url}`, data);
  }
  edit(url: string, data: any, headers: any = {}) {
    if (Object.keys(headers).length > 0)
      return this.http.patch<any>(`${this.baseUrl}${url}`, data, headers);
    return this.http.patch<any>(`${this.baseUrl}${url}`, data);
  }
  delete(url: string, data: object = {}) {
    console.log(data);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };
    return this.http.delete<any>(`${this.baseUrl}${url}`, options);
  }
}
