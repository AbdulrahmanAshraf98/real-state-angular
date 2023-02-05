import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../../services/user.service';
import { GlobalService } from 'src/app/services/global.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { userInterface } from 'src/app/interface/userInterface';

@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.css'],
})
export class AlluserComponent implements OnInit {
  subscription: any;
  loading = false;
  heads: string[] = [
    'id',
    'img',
    'email',
    'role name',
    'fName',
    'lName',
    'age',
    'actions',
  ];
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  change = false;
  get users() {
    return this.userService.users;
  }
  ngOnInit() {
    this.loading = true;
    this.subscription = this.userService.getAll(
      (response) => {},
      (error) => {
        this.toastr.error(error.error.message, 'failed to fetch users');
      },
      () => {
        this.loading = false;
      }
    );
  }
  ngDoCheck() {
    if (this.change) {
      this.loading = true;
      this.subscription = this.userService.getAll(
        () => {},
        (error) => {
          this.toastr.error(error.error.message, 'failed to fetch users');
        },
        () => {
          this.loading = false;
        }
      );
      this.change = false;
    }
  }
  deleteUserHandler(id: any) {
    this.subscription = this.userService.delete(
      id,
      (response) => {
        this.change = true;
      },
      (error) => {
        this.toastr.error(error.error.message, 'failed to delete user');
      },
      () => {}
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
