import { projectInterface } from './../interface/projectInterface';
import { CrudServicesInterface } from './../interface/crud-services-interface';
import { GlobalService } from './global.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService implements CrudServicesInterface {
  projects: projectInterface[] = [];
  constructor(private global: GlobalService) {}
  getAll(
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    return this.global.get('project/').subscribe({
      next: (response) => {
        this.projects = response.data;
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
    return this.global.get(`project/${id}`).subscribe({
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
    return this.global.post(`project/`, data).subscribe({
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
    return this.global.edit(`project/${id}`, data).subscribe({
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
    return this.global.delete(`project/${id}`).subscribe({
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
