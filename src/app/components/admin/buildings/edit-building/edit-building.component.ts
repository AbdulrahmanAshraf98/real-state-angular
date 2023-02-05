import { BuildingService } from './../../../../services/building.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { buildingInterface } from 'src/app/interface/buildingInterface';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-building',
  templateUrl: './edit-building.component.html',
  styleUrls: ['./edit-building.component.css'],
})
export class EditBuildingComponent {
  editForm: FormGroup;
  subscription: any;
  isSubmit: boolean = false;
  loading: boolean = false;
  buildingId: any;

  buildingImagesFiles: any[] = [];
  constructor(
    private buildingService: BuildingService,
    private activated: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      buildNumber: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.buildingId = this.activated.snapshot.paramMap.get('buildingId');
    this.loading = true;
    this.subscription = this.buildingService.getSingle(
      this.buildingId,
      (response) => {
        this.editForm.patchValue(response.data);
        this.loading = false;
      },
      (error) => {
        this.toastr.error('failed delete', 'failed to fetch  building data');
      },
      () => {}
    );
  }
  selectImageHandler(event: any) {
    if (event.target.files.length == 0) return;
    this.buildingImagesFiles = [...event.target.files];
  }
  submitHandler(form: any) {
    this.isSubmit = true;
    if (form.invalid) return;

    this.loading = true;
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('buildNumber', form.value.buildNumber);
    if (this.buildingImagesFiles.length) {
      this.buildingImagesFiles.forEach((buildImageFile) => {
        formData.append('buildingImages', buildImageFile, buildImageFile.name);
      });
    }
    this.subscription = this.buildingService.edit(
      this.buildingId,
      formData,
      () => {},
      (error) => {
        this.toastr.error('building failed to edit', 'failed');
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.router.navigateByUrl('/admin');
        this.toastr.success('building edit successfully', 'building edit ');
      }
    );
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
