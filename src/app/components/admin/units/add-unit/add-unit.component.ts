import { BuildingService } from './../../../../services/building.service';
import { UnitService } from 'src/app/services/unit.service';
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
  subscription: any;
  isSubmit = false;
  loading = false;
  unitImagesFiles: any[] = [];

  get buildings() {
    return this.BuildingService.buildings;
  }
  constructor(
    private global: GlobalService,
    private unitService: UnitService,
    private BuildingService: BuildingService,
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
    this.loading = true;
    this.BuildingService.getAll(
      (response) => {
        this.addUnitForm.patchValue({ buildingId: response.data[0]._id });
        this.loading = false;
      },
      (error) => {
        this.toastr.error('failed to fetch', ' failed to fetch buildings');
      },
      () => {}
    );
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
    formData.append('unitNumber', form.value.unitNumber);
    if (this.unitImagesFiles.length > 0) {
      this.unitImagesFiles.forEach((unitImageFile) => {
        formData.append('unitImages', unitImageFile, unitImageFile.name);
      });
    }
    this.subscription = this.unitService.add(
      formData,
      (response) => {
        console.log(response.data);
      },
      (error) => {
        this.toastr.error('failed to add new unit', 'unit create failed ');
      },
      () => {
        setTimeout(() => {
          this.loading = false;
          this.router.navigateByUrl('/admin');
          this.toastr.success('unit created successfully', 'unit  created ');
        }, 500);
      }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
