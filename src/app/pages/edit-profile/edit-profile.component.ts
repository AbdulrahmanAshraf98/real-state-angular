import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { userInterface } from 'src/app/interface/userInterface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  sidebarLinks = [
    { path: '/profile', name: 'profile' },
    { path: '/profile/edit', name: 'editProfile' },
    { path: '/profile/upload-new-image', name: 'updateProfileImage' },
    { path: '/profile/change-password', name: 'changePassword' },
  ];
  subscription: any;
  currentUserInfo: userInterface = {
    fName: '',
    lName: '',
    email: '',
    age: 21,
    profileImage: '',
  };

  constructor(private global: GlobalService) {
    this.currentUserInfo = this.global.currentUserInfo;
  }
  ngOnInit(): void {
    if (!this.currentUserInfo.email)
      this.subscription = this.global.get('me').subscribe((responseData) => {
        this.currentUserInfo = responseData.data;
        this.global.currentUserInfo = responseData.data;
      });
  }
  model = {
    fName: this.currentUserInfo.fName,
    lName: this.currentUserInfo.lName,
    age: this.currentUserInfo.age,
  };

  submitHandler(f: NgForm) {
    console.log(this.model);
    if (f.invalid) return;
    this.subscription = this.global
      .edit('me', this.model)
      .subscribe((responseData) => {
        this.global.currentUserInfo = responseData.data;
        this.currentUserInfo = this.global.currentUserInfo;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
