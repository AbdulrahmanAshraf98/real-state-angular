import { UnitInterface } from './../../../../interface/unit-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from './../../../../services/global.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

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
    private global: GlobalService,
    private activated: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.unitId = this.activated.snapshot.paramMap.get('unitId');
    if (this.unitId)
      this.subscription = this.global
        .get(`unit/${this.unitId}`)
        .subscribe((responseData) => {
          this.editForm.patchValue(responseData.data);
        });
  }
  selectImageHandler(event: any) {
    if (event.target.files.length == 0) return;
    this.unitImagesFiles = [...event.target.files];
  }
  submitHandler(form: any) {
    if (form.invalid) return;
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('price', form.value.price);
    if (this.unitImagesFiles.length) {
      this.unitImagesFiles.forEach((unitImageFile) => {
        formData.append('unitImages', unitImageFile, unitImageFile.name);
      });
    }
    this.global.edit(`unit/${this.unitId}`, formData).subscribe((response) => {
      this.router.navigateByUrl('/admin');
    });
  }
}
