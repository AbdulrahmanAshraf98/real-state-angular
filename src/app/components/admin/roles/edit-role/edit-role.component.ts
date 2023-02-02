import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css'],
})
export class EditRoleComponent {
  subscription: any;
  editRoleForm: FormGroup;
  isSubmit = false;
  loading = false;
  buildingImagesFiles: any[] = [];
  roleName: any;
  constructor(
    private roleService: RoleService,
    private router: Router,
    private activated: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.editRoleForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.loading = true;
    this.activated.paramMap.subscribe((res) => {
      this.roleName = res.get('roleName');
    });
    this.subscription = this.roleService.getSingle(
      this.roleName,
      (response) => {
        this.loading = false;
        this.editRoleForm.patchValue(response.data);
      }
    );
  }

  submitHandler(form: FormGroup) {
    this.isSubmit = true;
    if (form.invalid) return;
    this.loading = true;
    this.subscription = this.roleService.edit(
      this.roleName,
      form.value,
      (response) => {},
      () => {
        this.toastr.error('failed to edit  role', 'role edit failed ');
      },
      () => {
        this.loading = false;
        this.router.navigateByUrl('/admin');
        this.toastr.success('role edit successfully', 'role  edit ');
      }
    );
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
