import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-forger-password',
  templateUrl: './forger-password.component.html',
  styleUrls: ['./forger-password.component.css'],
})
export class ForgerPasswordComponent {
  constructor(private globalService: GlobalService) {}
  model = {
    email: '',
  };
  message: string = '';
  submitHandler(f: NgForm) {
    if (f.invalid) return;
    this.globalService
      .post('user/forgetPassword', this.model)
      .subscribe((responseData) => {
        this.message = responseData.message;
      });
  }
}
