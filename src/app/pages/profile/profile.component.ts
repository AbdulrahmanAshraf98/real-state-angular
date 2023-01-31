import { MeService } from './../../services/me.service';
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

  constructor(private global: GlobalService, private me: MeService) {}
  get currentUserInfo(): userInterface {
    return this.me.currentUser;
  }
  ngOnInit(): void {
    this.subscription = this.me.getCurrentUserData();
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
