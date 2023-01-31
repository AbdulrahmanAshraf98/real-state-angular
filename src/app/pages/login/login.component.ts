import { ToastrService } from 'ngx-toastr';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInterface } from 'src/app/interface/login';
import { AuthService } from 'src/app/services/auth.service';
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
  constructor(
    private global: GlobalService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  private handleSuccessfullyLogin(response: any) {}
  private handleFailedLogin(error: any) {
    this.toastr.error(error.error.message, 'failed');
    this.loading = false;
  }
  private handleCompleteLogin() {
    this.router.navigateByUrl('/profile');
    this.loading = false;
  }

  error = {};
  submitHandler(form: any) {
    this.isSubmit = true;
    if (form.invalid) return;
    this.loading = true;
    this.subscription = this.authService.login(
      form.value,
      this.handleSuccessfullyLogin.bind(this),
      this.handleFailedLogin.bind(this),
      this.handleCompleteLogin.bind(this)
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
