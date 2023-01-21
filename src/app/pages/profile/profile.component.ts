import { Component, OnDestroy, OnInit } from '@angular/core';
import { userInterface } from 'src/app/interface/userInterface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  sidebarLinks = [
    { path: '/profile', name: 'profile' },
    { path: '/profile/edit', name: 'editProfile' },
    { path: '/profile/upload-new-image', name: 'updateProfileImage' },
    { path: '/profile/change-password', name: 'changePassword' },
  ];
  subscription: any;
  currentUserInfo: userInterface;

  constructor(private global: GlobalService) {
    this.currentUserInfo = this.global.currentUserInfo;
  }
  ngOnInit(): void {
    this.subscription = this.global.get('me').subscribe((responseData) => {
      this.currentUserInfo = responseData.data;
      this.global.currentUserInfo = responseData.data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
