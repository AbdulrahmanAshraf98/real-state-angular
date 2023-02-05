import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from 'src/app/services/role.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-role-url',
  templateUrl: './add-role-url.component.html',
  styleUrls: ['./add-role-url.component.css'],
})
export class AddRoleUrlComponent implements OnInit {
  addUrlForm: FormGroup;
  isSubmit = false;
  loading = false;
  roleName: any = '';
  constructor(
    private roleService: RoleService,
    private activated: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.addUrlForm = new FormGroup({
      url: new FormControl('', [Validators.required]),
      methods: new FormArray([
        new FormGroup({
          method: new FormControl(''),
        }),
      ]),
      params: new FormArray([
        new FormGroup({
          param: new FormControl(''),
        }),
      ]),
      querys: new FormArray([
        new FormGroup({
          query: new FormControl(''),
        }),
      ]),
    });
  }
  ngOnInit(): void {
    this.loading = true;

    this.activated.paramMap.subscribe((res) => {
      this.roleName = res.get('roleName');
      this.loading = false;
    });
  }

  get methodsFormGroups() {
    return this.addUrlForm.get('methods') as FormArray;
  }
  get paramsFormGroups() {
    return this.addUrlForm.get('params') as FormArray;
  }
  get querysFormGroups() {
    return this.addUrlForm.get('querys') as FormArray;
  }

  addNewFormGroupHandler(type: string) {
    let control: any;
    if (type == 'method') {
      control = <FormArray>this.addUrlForm.controls['methods'];
      control.push(
        new FormGroup({
          method: new FormControl(''),
        })
      );
    } else if (type == 'param') {
      control = <FormArray>this.addUrlForm.controls['params'];
      control.push(
        new FormGroup({
          param: new FormControl(''),
        })
      );
    } else {
      control = <FormArray>this.addUrlForm.controls['querys'];
      control.push(
        new FormGroup({
          query: new FormControl(''),
        })
      );
    }
  }

  submitHandler(addUrlForm: any) {
    this.isSubmit = true;
    if (addUrlForm.invalid) return;
    this.loading = true;
    const { value } = addUrlForm;
    let methods = {};
    let params = {};
    let querys = {};
    console.log(value);
    /*
    {
      url:"",
      method:{
        "":""
      }

    }
    */
    if (Object.keys(value.methods).length > 0) {
      methods = value.methods.reduce((accumulator: any, current: any) => {
        if (current.method) {
          accumulator[current.method.toUpperCase()] =
            current.method.toUpperCase();
        }
        return accumulator;
      }, {});
    }
    if (Object.keys(value.params).length > 0) {
      params = value.params.reduce((accumulator: any, current: any) => {
        if (current.param) {
          accumulator[current.param.trim()] = current.param.trim();
        }
        return accumulator;
      }, {});
    }

    if (Object.keys(value.querys).length > 0) {
      querys = value.querys.reduce((accumulator: any, current: any) => {
        if (current.query) {
          accumulator[current.query.trim()] = current.query.trim();
        }
        return accumulator;
      }, {});
    }

    const roleUrl = {
      url: value.url,
      methods,
      params,
      querys,
    };
    this.roleService.createNewUrl(
      this.roleName,
      (response) => {
        console.log(response);
      },
      () => {},
      () => {
        this.loading = false;
        this.router.navigateByUrl(`/admin/role/${this.roleName}`);
        this.toastr.success('link created successfully', 'link  created ');
      },
      roleUrl
    );
  }
}
