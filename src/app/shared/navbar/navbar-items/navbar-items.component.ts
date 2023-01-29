import { GlobalService } from 'src/app/services/global.service';
import { NavbarItemInterface } from './../navbar-item.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-items',
  templateUrl: './navbar-items.component.html',
  styleUrls: ['./navbar-items.component.css'],
})
export class NavbarItemsComponent {
  @Input('nav-items') navItems: NavbarItemInterface[] = [
    { path: '', name: '' },
  ];

  constructor(private global: GlobalService) {}
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) this.global.isLogin = true;
  }
  public get isLogin() {
    return this.global.isLogin;
  }
  logoutHandler() {
    this.global.delete('user/logout').subscribe((responseData) => {
      localStorage.removeItem('token');
      this.global.isLogin = false;
    });
  }
}
