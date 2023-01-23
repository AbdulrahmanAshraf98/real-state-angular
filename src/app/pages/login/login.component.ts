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
  constructor(private global: GlobalService, private route: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    console.log(this.loginForm);
  }
  model: LoginInterface = {
    email: '',
    password: '',
  };

  error = {};
  submitHandler(form: any) {
    this.isSubmit = true;
    if (form.invalid) return;
    this.subscription = this.global.post('user/login', form.value).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('token', response.data.token);
        this.route.navigateByUrl('/profile');
      },
      (error) => console.log(error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
