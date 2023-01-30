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
    private global: GlobalService,
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
    this.subscription = this.global.get(`user/${this.userId}`).subscribe({
      next: (responseData) => {
        this.editUserForm.patchValue(responseData.data);
      },
      error: (error) => {
        this.router.navigateByUrl('/admin');
        this.toastr.error('user not found', '404 not found ');
      },
      complete: () => {},
    });
  }

  submitHandler(f: any) {
    this.isSubmit = true;
    if (f.invalid) return;
    this.loading = true;
    this.subscription = this.global
      .edit(`user/${this.userId}`, f.value)
      .subscribe({
        next: (responseData) => {},
        error: (error) => {
          this.router.navigateByUrl('/admin');
          this.toastr.error('user failed to edit', 'failed ');
        },
        complete: () => {
          this.loading = false;
          this.router.navigateByUrl('/admin');
          this.toastr.success('user edit successfully', 'user edit ');
        },
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
