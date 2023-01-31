import { userInterface } from 'src/app/interface/userInterface';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // currentUserInfo: userInterface = {
  //   fName: '',
  //   lName: '',
  //   email: '',
  //   age: 0,
  // };
  // isLogin = false;
  constructor(private global: GlobalService) {}
  login(
    value: object,
    successHandler = (response: object) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ): any {
    return this.global.post('user/login', value).subscribe({
      next: (response) => {
        this.global.currentUserInfo = response.data;
        localStorage.setItem('token', response.data.token);
        this.global.isLogin = true;
        successHandler(response);
      },
      error: (error) => {
        errorHandler(error);
      },
      complete: () => {
        completeHandler();
      },
    });
  }
  logout(
    successHandler = (response: object) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    return this.global.delete('user/logout').subscribe({
      next: (response) => {
        localStorage.removeItem('token');
        this.global.currentUserInfo = {
          fName: '',
          lName: '',
          email: '',
          age: 0,
        };
        this.global.isLogin = false;
        successHandler(response);
      },
      error: (error) => {
        errorHandler(error);
      },
      complete: () => {
        completeHandler();
      },
    });
  }
  public get currentUserInfo() {
    return this.global.currentUserInfo;
  }
  public set setIsLogin(value: boolean) {
    this.global.isLogin = value;
  }
  public get getIsLogin() {
    return this.global.isLogin;
  }
}
