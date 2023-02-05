import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { userInterface } from 'src/app/interface/userInterface';
import { GlobalService } from 'src/app/services/global.service';
import { MeService } from 'src/app/services/me.service';

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
  constructor(
    private global: GlobalService,
    private me: MeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.me.currentUser.email) {
      this.subscription = this.me.getCurrentUserData(
        (response) => {
          this.profileImageSrc = `http://localhost:8000/api/v1/public/uploads/users/${this.me.currentUser.profileImage}`;
        },
        () => {},
        () => {}
      );
    } else {
      this.profileImageSrc = `http://localhost:8000/api/v1/public/uploads/users/${this.me.currentUser.profileImage}`;
    }

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
    this.subscription = this.me.updateProfileImage(
      formData,
      (responseData) => {},
      (error) => {
        console.log(error);
      },
      () => {
        setTimeout(() => {
          this.profileImageSrc = `http://localhost:8000/api/v1/public/uploads/users/${this.me.currentUser.profileImage}`;
        }, 500);
      }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
