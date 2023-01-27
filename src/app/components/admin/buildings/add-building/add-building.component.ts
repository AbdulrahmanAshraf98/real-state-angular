import { Router } from '@angular/router';
import { GlobalService } from './../../../../services/global.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.css'],
})
export class AddBuildingComponent {
  addBuildingForm: FormGroup;
  isSubmit = false;
  loading = false;
  buildingImagesFiles: any[] = [];
  constructor(private global: GlobalService, private router: Router) {
    this.addBuildingForm = new FormGroup({
      projectId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      buildNumber: new FormControl('', [Validators.required]),
      BuildingImages: new FormControl('', []),
    });
  }
  selectImageHandler(event: any) {
    if (event.target.files.length == 0) return;
    this.buildingImagesFiles = [...event.target.files];
  }
  submitHandler(form: FormGroup) {
    this.isSubmit = true;
    if (form.invalid) return;
    const formData = new FormData();
    formData.append('projectId', form.value.projectId);
    formData.append('name', form.value.name);
    formData.append('buildNumber', form.value.buildNumber);
    if (this.buildingImagesFiles.length) {
      this.buildingImagesFiles.forEach((buildImageFile) => {
        formData.append('buildingImages', buildImageFile, buildImageFile.name);
      });
    }
    this.global.post(`building/`, formData).subscribe((response) => {
      setTimeout(() => {
        this.router.navigateByUrl('/admin/buildings');
      }, 500);
    });
  }
}
