import { GlobalService } from 'src/app/services/global.service';
import { Injectable } from '@angular/core';
import { CrudServicesInterface } from '../interface/crud-services-interface';
import { userInterface } from '../interface/userInterface';

@Injectable({
  providedIn: 'root',
})
export class UserService implements CrudServicesInterface {
  users: userInterface[] = [];
  constructor(private global: GlobalService) {}
  getAll(
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    return this.global.get('user/').subscribe({
      next: (response) => {
        this.users = response.data;
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
  getSingle(
    id: string,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    return this.global.get(`user/${id}`).subscribe({
      next: (response) => {
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
  add(
    data: any,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    return this.global.post(`user/`, data).subscribe({
      next: (response) => {
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
  edit(
    id: string,
    data: any,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    return this.global.edit(`user/${id}`, data).subscribe({
      next: (response) => {
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
  delete(
    id: string,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {},
    data: any = {}
  ) {
    return this.global.delete(`user/${id}`).subscribe({
      next: (response) => {
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
}
