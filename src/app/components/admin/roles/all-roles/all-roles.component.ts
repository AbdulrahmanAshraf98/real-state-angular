import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-all-roles',
  templateUrl: './all-roles.component.html',
  styleUrls: ['./all-roles.component.css'],
})
export class AllRolesComponent implements OnInit, OnDestroy {
  subscription: any;
  heads: string[] = ['_id', 'name', 'type', 'actions'];
  loading = false;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.roleService.getAll((response) => {
      this.loading = false;
    });
  }

  get roles() {
    return this.roleService.roles;
  }
  deleteRoleHandler(roleName: string) {
    this.roleService.delete(
      roleName,
      (response) => {},
      (error) => {
        console.log(error);
      },
      () => {}
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
