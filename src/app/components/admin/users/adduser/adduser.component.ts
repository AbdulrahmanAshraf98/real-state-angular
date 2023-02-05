import { MeService } from 'src/app/services/me.service';
import { RoleService } from 'src/app/services/role.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from './../../../../services/user.service';
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
  subscription: any;
  roleNames: string[] = [];

  admin = false;
  addUserForm: FormGroup;
  isSubmit = false;
  loading = false;
  get roles() {
    return this.roleService.roles;
  }
  constructor(
    private meService: MeService,
    private userService: UserService,
    private roleService: RoleService,
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
    if (!this.meService.currentUser.role.type) {
      this.loading = true;
      this.meService.getCurrentUserData(
        (response) => {
          this.admin = true;
          this.roleService.getAll(
            (response) => {
              this.roleNames = this.roles.map((role) => role.name);
            },
            (error) => {
              this.toastr.error(error.error.message, 'role');
              this.loading = false;
            },
            () => {}
          );
        },
        (error) => {
          this.toastr.error(
            error.error.message,
            'failed fetch current user data'
          );
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    } else if (this.meService.currentUser.role.type == 'admin') {
      this.admin = true;
      this.loading = true;
      this.roleService.getAll(
        (response) => {
          this.roleNames = this.roles.map((role) => role.name);
          this.loading = false;
        },
        (error) => {
          this.toastr.error(error.error.message, 'role');
          this.loading = false;
        },
        () => {}
      );
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
    this.isSubmit = true;
    if (form.invalid) return;
    this.loading = true;
    this.subscription = this.userService.add(
      form.value,
      (response) => {},
      (error) => {
        this.loading = false;
        if (error.error.data.code == 11000) {
          this.toastr.error('email created before ', 'users');
        } else {
          this.toastr.error(error.error.message, 'users');
        }
      },
      () => {
        this.loading = false;
        this.route.navigateByUrl('/admin');
        this.toastr.success('user', 'user created');
      }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
