import { NavbarItemInterface } from './../navbar-item.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css'],
})
export class NavbarItemComponent {
  @Input('nav-item') item: NavbarItemInterface = { name: '', path: '' };
}
