import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginInterface } from 'src/app/interface/login';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  subscription: any;
  constructor(private global: GlobalService) {}
  model: LoginInterface = {
    email: '',
    password: '',
  };
  error = {};
  submitHandler(f: NgForm) {
    if (f.invalid) return;
    this.subscription = this.global.post('user/login', this.model).subscribe(
      (response) => {
        localStorage.setItem('token', response.data.token);
      },
      (error) => console.log(error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
