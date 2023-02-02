import { RoleService } from 'src/app/services/role.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
})
export class AddRoleComponent {
  subscription: any;
  addRoleForm: FormGroup;
  isSubmit = false;
  loading = false;
  buildingImagesFiles: any[] = [];
  constructor(
    private roleService: RoleService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.addRoleForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('admin', [Validators.required]),
    });
  }
  ngOnInit() {}

  submitHandler(form: FormGroup) {
    this.isSubmit = true;
    if (form.invalid) return;
    this.loading = true;
    this.subscription = this.roleService.add(
      form.value,
      (response) => {},
      () => {
        this.toastr.error('failed to create new role', 'role create failed ');
      },
      () => {
        this.loading = false;
        this.router.navigateByUrl('/admin');
        this.toastr.success('role created successfully', 'role  created ');
      }
    );
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
