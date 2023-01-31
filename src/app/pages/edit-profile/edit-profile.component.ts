import { ToastrService } from 'ngx-toastr';
import { MeService } from 'src/app/services/me.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
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
  editMeForm: FormGroup;
  isSubmit = false;

  constructor(
    private global: GlobalService,
    private me: MeService,
    private toaster: ToastrService
  ) {
    this.editMeForm = new FormGroup({
      fName: new FormControl(this.me.currentUser.fName, [
        Validators.required,
        Validators.minLength(5),
      ]),
      lName: new FormControl(this.me.currentUser.lName, [
        Validators.required,
        Validators.minLength(5),
      ]),
      age: new FormControl(this.me.currentUser.age, [
        Validators.required,
        Validators.min(18),
      ]),
    });
  }
  ngOnInit(): void {
    if (!this.me.currentUser.email) {
      this.me.getCurrentUserData(
        (responseData) => {
          this.editMeForm.patchValue(this.me.currentUser);
        },
        (error) => {
          this.toaster.error(error.error.message, 'fetch user failed ');
        },
        () => {}
      );
    }
  }
  get currentUserProfileImage() {
    return this.me.currentUser.profileImage;
  }
  submitHandler(form: any) {
    this.isSubmit = true;
    if (form.invalid) return;
    this.subscription = this.me.editProfileData(
      form.value,
      (response) => {
        this.toaster.success(response.message, 'edit successfully');
      },
      (error) => {
        this.toaster.error(error.error.message, 'edit failed');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
