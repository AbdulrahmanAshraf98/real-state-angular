import { GlobalService } from 'src/app/services/global.service';

import { CrudServicesInterface } from './../interface/crud-services-interface';
import { Injectable } from '@angular/core';
import { UnitInterface } from '../interface/unit-interface';

@Injectable({
  providedIn: 'root',
})
export class UnitService implements CrudServicesInterface {
  units: UnitInterface[] = [];
  constructor(private global: GlobalService) {}
  getAll(
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    return this.global.get('unit/').subscribe({
      next: (response) => {
        this.units = response.data;
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
    return this.global.get(`unit/${id}`).subscribe({
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
    return this.global.post(`unit/`, data).subscribe({
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
    return this.global.edit(`unit/${id}`, data).subscribe({
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
    data: any
  ) {
    return this.global.delete(`unit/${id}`, data).subscribe({
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
  buyUnit(
    data: any,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    return this.global.post(`unit/sellUnit`, data).subscribe({
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
