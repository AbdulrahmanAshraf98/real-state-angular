import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  sidebarLinks = [
    { path: '/profile', name: 'profile' },
    { path: '/profile/edit', name: 'editProfile' },
    { path: '/profile/upload-new-image', name: 'updateProfileImage' },
    { path: '/profile/change-password', name: 'changePassword' },
  ];
  subscription: any;
  userProfileImage: any = this.global.currentUserInfo.profileImage;
  profileImageFile: any;
  changed: boolean = false;
  constructor(private global: GlobalService) {}

  ngOnInit(): void {
    if (!this.global.currentUserInfo.email)
      this.subscription = this.global.get('me').subscribe((responseData) => {
        this.global.currentUserInfo = responseData.data;
        this.userProfileImage = this.global.currentUserInfo.profileImage;
      });
  }
  model = {
    password: '',
    newPassword: '',
  };
  submitHandler(f: NgForm) {
    if (f.invalid) return;
    this.global
      .post('me/updatePassword', this.model)
      .subscribe((responseData) => {
        this.changed = true;
        console.log(this.changed);
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    this.changed = false;
  }
}
