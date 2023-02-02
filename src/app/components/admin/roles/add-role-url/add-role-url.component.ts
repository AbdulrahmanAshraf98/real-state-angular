import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-add-role-url',
  templateUrl: './add-role-url.component.html',
  styleUrls: ['./add-role-url.component.css'],
})
export class AddRoleUrlComponent {
  // subscription: any;
  // addUrlForm: FormGroup;
  // isSubmit = false;
  // loading = false;
  // buildingImagesFiles: any[] = [];
  // roleName: any;
  // constructor(
  //   private fb: FormBuilder,
  //   private roleService: RoleService,
  //   private router: Router,
  //   private activated: ActivatedRoute,
  //   private toastr: ToastrService
  // ) {
  //   this.addUrlForm = new FormGroup({
  //     url: new FormControl('', [Validators.required]),
  //     methods: this.fb.array([this.createMethodField()]),
  //     params: new FormControl('', [Validators.required]),
  //     querys: new FormControl('', [Validators.required]),
  //   });
  // }
  // createMethodField() {
  //   return this.fb.group({ method: ['', Validators.required] });
  // }
  // addMethodField() {
  //   const methods = this.addUrlForm.get('methods') as FormArray;
  //   methods.push(this.createMethodField());
  // }
  // get getMethodscontrols() {
  //   return this.addUrlForm.get('methods');
  // }
  // ngOnInit() {}
  // submitHandler(form: FormGroup) {}
  // ngOnDestroy() {
  //   if (this.subscription) this.subscription.unsubscribe();
  // }
}
