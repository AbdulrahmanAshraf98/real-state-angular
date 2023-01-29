import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInterface } from 'src/app/interface/login';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  subscription: any;
  loginForm: FormGroup;
  isSubmit = false;
  loading = false;
  constructor(private global: GlobalService, private route: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  error = {};
  submitHandler(form: any) {
    this.isSubmit = true;
    if (form.invalid) return;
    this.loading = true;
    this.global.post('user/login', form.value).subscribe(
      (response) => {
        localStorage.setItem('token', response.data.token);
        this.global.isLogin = true;
        this.route.navigateByUrl('/profile');
      },
      (error) => console.log(error),
      () => {
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {}
}
