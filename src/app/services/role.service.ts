import { RoleInterface } from './../interface/role-interface';
import { CrudServicesInterface } from './../interface/crud-services-interface';
import { GlobalService } from 'src/app/services/global.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService implements CrudServicesInterface {
  roles: RoleInterface[] = [];
  constructor(private global: GlobalService) {}
  getAll(
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    return this.global.get('role/').subscribe({
      next: (response) => {
        this.roles = response.data;
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
    name: string,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    return this.global.get(`role/${name}`).subscribe({
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
    return this.global.post(`role/`, data).subscribe({
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
    roleName: string,
    data: any,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    return this.global.edit(`role/${roleName}`, data).subscribe({
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
    name: string,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {},
    data: any = {}
  ) {
    return this.global.delete(`role/${name}`).subscribe({
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
  createNewUrl(
    name: string,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {},
    data: any = {}
  ) {
    return this.global.post(`role/${name}/newRoleUrl`, data).subscribe({
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
  removeUrlFromRole(
    name: string,
    urlId: string,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {},
    data: any = {}
  ) {
    return this.global
      .delete(`role/${name}/removeUrlFromRole/${urlId}`)
      .subscribe({
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
  removeUrlMethod(
    name: string,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {},
    data: any = {}
  ) {
    return this.global.delete(`role/${name}/method`, data).subscribe({
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
  removeUrlParam(
    name: string,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {},
    data: any = {}
  ) {
    return this.global.delete(`role/${name}/param`, data).subscribe({
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
  removeUrlQuery(
    name: string,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {},
    data: any = {}
  ) {
    return this.global.delete(`role/${name}/query`, data).subscribe({
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
