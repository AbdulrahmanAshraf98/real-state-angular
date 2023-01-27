import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userInterface } from 'src/app/interface/userInterface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent implements OnDestroy, OnInit {
  subscription: any;
  userId: any;
  UserInfo: userInterface = {
    _id: '',
    fName: '',
    lName: '',
    email: '',
    age: 21,
    profileImage: '',
  };

  constructor(
    private global: GlobalService,
    private activated: ActivatedRoute
  ) {
    this.userId = this.activated.snapshot.paramMap.get('userId');

    if (this.userId)
      this.subscription = this.global
        .get(`user/${this.userId}`)
        .subscribe((responseData) => {
          this.UserInfo = responseData.data;
          console.log(this.UserInfo);
        });
  } 

  ngOnInit(): void {}
  model = {
    fName: '',
    lName: '',
    email: '',
    age: 0,
  };

  submitHandler(f: NgForm) {
    if (f.invalid) return;
    if (this.userId)
      this.subscription = this.global
        .edit(`user/${this.userId}`, this.model)
        .subscribe({
          next: (responseData) => {
            this.UserInfo = responseData.data;
          },
        });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
