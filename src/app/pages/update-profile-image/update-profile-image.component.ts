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

  profileImageSrc: string = `http://localhost:8000/api/v1/public/uploads/users/${
    this.global.currentUserInfo.profileImage
  }?${Math.random().toString()}`;
  model = {
    profileImage: '',
  };
  profileImageFile: any;
  constructor(private global: GlobalService) {}
  ngOnInit(): void {
    if (!this.global.currentUserInfo.email)
      this.subscription = this.global.get('me').subscribe((responseData) => {
        this.global.currentUserInfo = responseData.data;
        this.profileImageSrc = `http://localhost:8000/api/v1/public/uploads/users/${
          this.global.currentUserInfo.profileImage
        }?${Math.random().toString()}`;
      });
  }

  selectImageHandler(event: any) {
    if (event.target.files.length == 0) return;
    const file = event.target.files[0];
    this.profileImageFile = file;
  }

  submitHandler(f: NgForm) {
    if (f.invalid) return;
    const formData = new FormData();
    formData.append('photo', this.profileImageFile, this.profileImageFile.name);
    this.subscription = this.global
      .edit('me/changeProfileImage', formData)
      .subscribe({
        next: (responseData: any) => {
          console.log(responseData);
          this.global.currentUserInfo = responseData.data;
          this.profileImageSrc = `http://localhost:8000/api/v1/public/uploads/users/${
            this.global.currentUserInfo.profileImage
          }?${Math.random().toString()}`;
        },
      });
    // (responseData) => {
    //   this.global.currentUserInfo = responseData.data;
    //   this.profileImageSrc = `http://localhost:8000/api/v1/public/uploads/users/${
    //     this.global.currentUserInfo.profileImage
    //   }?${Math.random().toString()}`;
    // },
    // (err: Error) => console.error('Observer got an error: ' + err)
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
