import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { NavbarItemInterface } from './../navbar-item.interface';
import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-items',
  templateUrl: './navbar-items.component.html',
  styleUrls: ['./navbar-items.component.css'],
})
export class NavbarItemsComponent {
  @Input('nav-items') navItems: NavbarItemInterface[] = [
    { path: '', name: '' },
  ];
  subscription: any;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.setIsLogin = true;
    }
  }
  public get isLogin() {
    return this.authService.getIsLogin;
  }
  public get userRole(): string {
    return this.authService.currentUserInfo.role.type;
  }
  logoutHandler() {
    this.subscription = this.authService.logout();
    this.router.navigateByUrl('/');
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
