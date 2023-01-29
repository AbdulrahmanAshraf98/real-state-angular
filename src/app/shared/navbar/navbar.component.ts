import { Component } from '@angular/core';
import { NavbarItemInterface } from './navbar-item.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navItems: NavbarItemInterface[] = [
    { name: 'home', path: '' },
    { name: 'projects', path: '/projects' },
    { name: 'buildings', path: '/buildings' },
    { name: 'profile', path: '/profile' },
    { name: 'units', path: '/units' },
  ];
}
