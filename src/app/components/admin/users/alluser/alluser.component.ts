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

  ngOnInit() {
    this.subscription = this.global.get('user/').subscribe({
      next: (responseData) => {
        this.users = responseData.data;
      },
      error: (error) => {},
    });
  }
  deleteUserHandler(id: any) {
    console.log(id);
    this.global.delete(`user/${id}`).subscribe((response) => {});
  }

  ngOnDestroy(): void {}
}
