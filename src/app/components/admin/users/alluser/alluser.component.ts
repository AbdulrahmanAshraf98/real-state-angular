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
  users: userInterface[] = [];
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
  constructor(private global: GlobalService) {}
  change = false;

  ngOnInit() {
    this.subscription = this.global.get('user/').subscribe({
      next: (responseData) => {
        this.users = responseData.data;
      },
      error: (error) => {},
    });
  }
  ngDoCheck() {
    if (this.change) {
      this.global.get('user/').subscribe({
        next: (responseData) => {
          this.users = responseData.data;
        },
      });
      this.change = false;
    }
  }
  deleteUserHandler(id: any) {
    this.global.delete(`user/${id}`).subscribe((response) => {
      this.change = true;
    });
  }

  ngOnDestroy(): void {}
}
