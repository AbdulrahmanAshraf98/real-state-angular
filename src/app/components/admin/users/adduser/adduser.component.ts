import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { roleInterface } from 'src/app/interface/roleInterface';
import { GlobalService } from 'src/app/services/global.service';

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
  constructor(private global: GlobalService, private route: Router) {
    this.addUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      fName: new FormControl('', [Validators.required]),
      lName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
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
    this.isSubmit = true;
    if (form.invalid) return;
    console.log(form);

    this.global.post('user/', form.value).subscribe(
      (response) => {
        console.log(response);
        this.route.navigateByUrl('/admin');
      },
      (error) => console.log(error)
    );
  }
}
