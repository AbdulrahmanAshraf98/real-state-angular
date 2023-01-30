import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { roleInterface } from 'src/app/interface/roleInterface';
import { GlobalService } from 'src/app/services/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css'],
})
export class AdduserComponent implements OnInit {
  roleNames: string[] = [];
  roles: roleInterface[] = [];
  admin = false;
  addUserForm: FormGroup;
  isSubmit = false;
  loading = false;
  constructor(
    private global: GlobalService,
    private route: Router,
    private toastr: ToastrService
  ) {
    this.addUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      fName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      lName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      age: new FormControl(18, [Validators.required, Validators.min(18)]),
      roleType: new FormControl('', []),
      roleName: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.admin = false;
    if (!this.global.currentUserInfo.email) {
      this.global.get('me').subscribe((response) => {
        this.global.currentUserInfo = response.data;
        if (this.global.currentUserInfo.role.type == 'admin') {
          this.admin = true;
          this.global.get('role').subscribe((response) => {
            this.roles = response.data;
            this.roleNames = this.roles.map((role) => role.name);
          });
        }
      });
    }

    if (this.global.currentUserInfo.role.type == 'admin') {
      this.admin = true;
      this.global.get('role').subscribe((response) => {
        this.roles = response.data;
        this.roleNames = this.roles.map((role) => role.name);
      });
    }
  }
  selectTypeHandler(selected: any) {
    if (selected == '0') {
      this.roleNames = this.roles.map((role) => role.name);
    } else {
      const newRolesName: string[] = [];
      this.roles.forEach((role) => {
        if (role.type == selected) {
          newRolesName.push(role.name);
        }
      });
      this.roleNames = newRolesName;
    }
  }

  submitHandler(form: any) {
    console.log(form);
    this.isSubmit = true;
    if (form.invalid) return;
    this.loading = true;
    console.log(form);

    this.global.post('user/', form.value).subscribe({
      next: (response) => {
        this.loading = false;
        this.route.navigateByUrl('/admin');
        this.toastr.success(response.data.message, 'user created');
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
        if (error.error.data.code == 11000) {
          this.toastr.error('email created before ', 'users');
        }
        if (error.error.data.code == 11000) {
          this.toastr.error('email created before ', 'users');
        }
      },
      complete: () => {},
    });
  }
}
