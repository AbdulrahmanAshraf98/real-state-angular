import { GlobalService } from 'src/app/services/global.service';
import { buildingInterface } from '../interface/buildingInterface';
import { CrudServicesInterface } from './../interface/crud-services-interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BuildingService implements CrudServicesInterface {
  buildings: buildingInterface[] = [];
  constructor(private global: GlobalService) {}
  getAll(
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    return this.global.get('building/').subscribe({
      next: (response) => {
        this.buildings = response.data;
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
    return this.global.get(`building/${id}`).subscribe({
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
    return this.global.post(`building/`, data).subscribe({
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
    return this.global.edit(`building/${id}`, data).subscribe({
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
    return this.global.delete(`building/${id}`, data).subscribe({
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
