import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userInterface } from 'src/app/interface/userInterface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-update-profile-image',
  templateUrl: './update-profile-image.component.html',
  styleUrls: ['./update-profile-image.component.css'],
})
export class UpdateProfileImageComponent {
  sidebarLinks = [
    { path: '/profile', name: 'profile' },
    { path: '/profile/edit', name: 'editProfile' },
    { path: '/profile/upload-new-image', name: 'updateProfileImage' },
    { path: '/profile/change-password', name: 'changePassword' },
  ];
  subscription: any;

  profileImageSrc: string = ``;
  model = {
    profileImage: '',
  };
  profileImageFile: any;
  constructor(private global: GlobalService) {}
  ngOnInit(): void {
    if (!this.global.currentUserInfo.email)
      this.subscription = this.global.get('me').subscribe((responseData) => {
        this.global.currentUserInfo = responseData.data;
        if (this.global.currentUserInfo.profileImage)
          this.profileImageSrc = `http://localhost:8000/api/v1/public/uploads/users/${this.global.currentUserInfo.profileImage}`;
      });
    if (this.global.currentUserInfo.email)
      this.profileImageSrc = `http://localhost:8000/api/v1/public/uploads/users/${this.global.currentUserInfo.profileImage}`;
  }

  selectImageHandler(event: any) {
    if (event.target.files.length == 0) return;
    const file = event.target.files[0];
    this.profileImageFile = file;
  }
  data: any;
  submitHandler(f: NgForm) {
    if (f.invalid) return;
    const formData = new FormData();
    formData.append('photo', this.profileImageFile, this.profileImageFile.name);
    this.subscription = this.global
      .edit('me/changeProfileImage', formData)
      .subscribe(
        (responseData: any) => {
          console.log(
            this.global.currentUserInfo.profileImage,
            responseData.data.profileImage
          );
          this.data = responseData.data;
          this.global.currentUserInfo = responseData.data;
          // console.log(this.)
          // this.profileImageSrc = `http://localhost:8000/api/v1/public/uploads/users/${this.global.currentUserInfo.profileImage}`;
        },
        () => {},
        () => {
          this.global.currentUserInfo = this.data;
          setTimeout(() => {
            this.profileImageSrc = `http://localhost:8000/api/v1/public/uploads/users/${this.global.currentUserInfo.profileImage}`;
          }, 300);

          // console.log(this.data.profileImage);
        }
      );
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
