import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  model = {
    email: '',
    fName: '',
    lName: '',
    password: '',
    age: 0,
  };
  constructor(private global: GlobalService) {}

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

  submitHandler(f: NgForm) {}
}
