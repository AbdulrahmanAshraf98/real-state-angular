import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MeService } from '../services/me.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateUserRoleGuard implements CanActivate {
  access: boolean = true;
  constructor(private me: MeService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.me.currentUser.role.type) {
      this.me.getCurrentUserData(
        () => {},
        () => {},
        () => {
          if (this.me.currentUser.role.type == 'customer') this.access = false;
        }
      );
    }
    if (this.me.currentUser.role.type == 'customer') this.access = false;
    return this.access;
  }
}
