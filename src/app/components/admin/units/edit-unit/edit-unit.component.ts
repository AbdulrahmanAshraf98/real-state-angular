import { ToastrService } from 'ngx-toastr';
import { UnitInterface } from './../../../../interface/unit-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from './../../../../services/global.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.css'],
})
export class EditUnitComponent {
  editForm: FormGroup;
  subscription: any;
  isSubmit: boolean = false;
  loading: boolean = false;
  unitId: any;

  unitImagesFiles: any[] = [];
  constructor(
    private uniteServices: UnitService,
    private activated: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.unitId = this.activated.snapshot.paramMap.get('unitId');
    this.loading = true;
    this.subscription = this.uniteServices.getSingle(
      this.unitId,
      (response) => {
        this.editForm.patchValue(response.data);
      },
      (error) => {
        this.toastr.error('failed delete', 'failed to fetch  unit data');
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  selectImageHandler(event: any) {
    if (event.target.files.length == 0) return;
    this.unitImagesFiles = [...event.target.files];
  }
  submitHandler(form: any) {
    this.isSubmit = true;
    if (form.invalid) return;
    this.loading = true;
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('price', form.value.price);
    if (this.unitImagesFiles.length > 0) {
      this.unitImagesFiles.forEach((unitImageFile) => {
        formData.append('unitImages', unitImageFile, unitImageFile.name);
      });
    }
    this.subscription = this.uniteServices.edit(
      this.unitId,
      formData,
      (response) => {},
      (error) => {
        this.toastr.error('building failed to edit', 'failed');
        this.loading = false;
      },
      () => {
        setTimeout(() => {
          this.loading = false;
          this.router.navigateByUrl('/admin');
          this.toastr.success('unit edit successfully', 'unit edit ');
        }, 500);
  
      }
    );
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
