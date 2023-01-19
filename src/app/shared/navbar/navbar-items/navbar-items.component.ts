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
}
