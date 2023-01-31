import { GlobalService } from 'src/app/services/global.service';
import { Injectable } from '@angular/core';
import { userInterface } from '../interface/userInterface';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  constructor(private global: GlobalService) {}
  public get currentUser() {
    return this.global.currentUserInfo;
  }
  getCurrentUserData(
    successHandler = (response: object) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    return this.global.get('me').subscribe({
      next: (responseData) => {
        this.global.currentUserInfo = responseData.data;
        successHandler(responseData);
      },
      error: (error) => {
        errorHandler(error);
      },
      complete: () => {
        completeHandler();
      },
    });
  }
  editProfileData(
    data: object,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    return this.global.edit('me', data).subscribe({
      next: (responseData) => {
        this.global.currentUserInfo = responseData.data;
        successHandler(responseData);
      },
      error: (error) => {
        console.log(error);
        errorHandler(error);
      },
      complete: () => {
        completeHandler();
      },
    });
  }
  updateProfileImage(
    formData: FormData,
    successHandler = (response: any) => {},
    errorHandler = (error: any) => {},
    completeHandler = () => {}
  ) {
    let data: userInterface;
    return this.global.edit('me/changeProfileImage', formData).subscribe({
      next: (responseData: any) => {
        data = responseData.data;
        successHandler(responseData);
      },
      error: (error) => {
        errorHandler(error);
      },
      complete: () => {
        this.global.currentUserInfo = data;
        completeHandler();
      },
    });
  }
}
