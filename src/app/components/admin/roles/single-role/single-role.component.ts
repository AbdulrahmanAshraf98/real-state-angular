import { ToastrService } from 'ngx-toastr';
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
  heads = ['_id', 'link', 'params', 'query', 'method', 'actions'];
  role: roleInterface = {
    name: '',
    type: '',
    urls: [],
  };
  roleName: any;
  loading = false;
  change = false;
  constructor(
    private roleService: RoleService,
    private activated: ActivatedRoute,
    private toastr: ToastrService
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
  ngDoCheck() {
    if (this.change) {
      this.subscription = this.roleService.getSingle(
        this.roleName,
        (response) => {
          this.loading = false;
          this.role = response.data;
        },
        (error) => {
          this.toastr.error(error.message, 'failed to fetch');
        },
        () => {}
      );

      this.change = false;
    }
  }
  deleteRoleHandler(urlId: string) {
    this.roleService.removeUrlFromRole(
      this.roleName,
      urlId,
      (response) => {
        console.log(response);
      },
      (error) => {
        this.toastr.error(error.error.message, 'failed to delete');
      },
      () => {
        this.change = true;
      },
      {}
    );
  }
  deleteMethodHandler(urlId: string, methodName: any) {
    this.roleService.removeUrlMethod(
      this.roleName,
      (response) => {
        console.log(response);
      },
      (error) => {
        this.toastr.error(error.error.message, 'failed to delete');
      },
      () => {
        this.change = true;
      },
      { urlId: urlId, method: methodName }
    );
  }
  deleteParamHandler(urlId: string, paramName: any) {
    this.roleService.removeUrlParam(
      this.roleName,
      (response) => {
        console.log(response);
      },
      (error) => {
        this.toastr.error(error.error.message, 'failed to delete');
      },
      () => {
        this.change = true;
      },
      { urlId: urlId, param: paramName }
    );
  }
  deleteQueryHandler(urlId: string, queryName: any) {
    this.roleService.removeUrlQuery(
      this.roleName,
      (response) => {
        console.log(response);
      },
      (error) => {
        this.toastr.error(error.error.message, 'failed to delete');
      },
      () => {
        this.change = true;
      },
      { urlId: urlId, query: queryName }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
