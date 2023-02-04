import { ToastrService } from 'ngx-toastr';
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
  change = false;
  constructor(
    private roleService: RoleService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.roleService.getAll((response) => {
      this.loading = false;
    });
  }

  get roles() {
    return this.roleService.roles;
  }
  ngDoCheck() {
    if (this.change) {
      this.subscription = this.roleService.getAll(
        (response) => {},
        (error) => {
          this.toastr.error(error.message, 'failed to fetch');
        },
        () => {}
      );
      this.change = false;
    }
  }
  deleteRoleHandler(roleName: string) {
    this.roleService.delete(
      roleName,
      (response) => {},
      (error) => {
        this.toastr.error(error.message, 'failed to deleted');
      },
      () => {
        this.change = true;
      }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
