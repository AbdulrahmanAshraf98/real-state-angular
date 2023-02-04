import { ActivatedRoute } from '@angular/router';
import { roleInterface } from 'src/app/interface/roleInterface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-single-role',
  templateUrl: './single-role.component.html',
  styleUrls: ['./single-role.component.css'],
})
export class SingleRoleComponent implements OnInit, OnDestroy {
  subscription: any;
  heads = ['_id', 'link', 'params', 'query', 'method'];
  role: roleInterface = {
    name: '',
    type: '',
    urls: [],
  };
  roleName: any;
  loading = false;
  constructor(
    private roleService: RoleService,
    private activated: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.activated.paramMap.subscribe((res) => {
      this.roleName = res.get('roleName');
    });
    this.subscription = this.roleService.getSingle(
      this.roleName,
      (response) => {
        this.loading = false;
        this.role = response.data;
      }
    );
  }
  get urls() {
    return this.role.urls;
  }
  deleteRoleHandler(urlId: string) {
    this.roleService.removeUrlFromRole(
      this.roleName,
      urlId,
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      },
      () => {}
    );
  }
  deleteMethodHandler(urlId: string, methodName: any) {
    console.log(urlId);
    this.roleService.removeUrlMethod(
      this.roleName,
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      },
      () => {},
      { urlId: urlId, method: methodName }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
