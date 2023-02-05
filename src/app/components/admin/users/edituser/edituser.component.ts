import { UserService } from './../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { userInterface } from 'src/app/interface/userInterface';
import { GlobalService } from 'src/app/services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent implements OnDestroy, OnInit {
  subscription: any;
  editUserForm: FormGroup;
  isSubmit = false;
  userId: any;
  loading = false;
  constructor(
    private userService: UserService,
    private activated: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.editUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      fName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      lName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      age: new FormControl(18, [Validators.required, Validators.min(18)]),
    });
  }

  ngOnInit(): void {
    this.userId = this.activated.snapshot.paramMap.get('userId');
    if (!this.userId) {
      this.router.navigateByUrl('/');
      return;
    }
    this.loading = true;
    this.subscription = this.userService.getSingle(
      this.userId,
      (response) => {
        this.editUserForm.patchValue(response.data);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.router.navigateByUrl('/admin');
        this.toastr.error('user not found', '404 not found ');
      },
      () => {}
    );
  }

  submitHandler(form: any) {
    this.isSubmit = true;
    if (form.invalid) return;
    this.loading = true;
    this.subscription = this.userService.edit(
      this.userId,
      form.value,
      () => {},
      (error) => {
        this.toastr.error('failed to edit user', 'failed edit');
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.router.navigateByUrl('/admin');
        this.toastr.success('user edit successfully', 'user edit ');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
