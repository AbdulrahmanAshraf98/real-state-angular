import { ToastrService } from 'ngx-toastr';
import { buildingInterface } from 'src/app/interface/buildingInterface';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css'],
})
export class AddUnitComponent {
  addUnitForm: FormGroup;
  isSubmit = false;
  loading = false;
  unitImagesFiles: any[] = [];
  buildings: buildingInterface[] = [];
  constructor(
    private global: GlobalService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.addUnitForm = new FormGroup({
      buildingId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      unitNumber: new FormControl('', [Validators.required]),
      unitImages: new FormControl('', []),
    });
  }
  ngOnInit() {
    this.global.get('building').subscribe((response) => {
      this.buildings = response.data;
    });
  }
  selectImageHandler(event: any) {
    if (event.target.files.length == 0) return;
    this.unitImagesFiles = [...event.target.files];
  }
  submitHandler(form: FormGroup) {
    console.log(form.value);
    this.isSubmit = true;
    if (form.invalid) return;
    this.loading = true;
    const formData = new FormData();
    formData.append('buildingId', form.value.buildingId);
    formData.append('name', form.value.name);
    formData.append('price', form.value.price);
    formData.append('unitNumber', form.value.buildNumber);
    if (this.unitImagesFiles.length) {
      this.unitImagesFiles.forEach((unitImageFile) => {
        formData.append('unitImages', unitImageFile, unitImageFile.name);
      });
    }
    this.global.post(`unit/`, formData).subscribe({
      next: (response) => {},
      error: (error) => {
        this.toastr.error('failed to add new unit', 'unit create failed ');
      },
      complete: () => {
        this.loading = false;
        this.router.navigateByUrl('/admin');
        this.toastr.success('unit created successfully', 'unit  created ');
      },
    });
  }
}
