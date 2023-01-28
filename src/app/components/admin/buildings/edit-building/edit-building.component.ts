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
  buildingInfo: buildingInterface = {
    _id: '',
    name: '',
    projectId: '',
    buildNumber: 0,
    floorNum: 0,
    units: [],
    buildingImages: [],
  };
  buildingImagesFiles: any[] = [];
  constructor(
    private global: GlobalService,
    private activated: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      buildNumber: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.buildingId = this.activated.snapshot.paramMap.get('buildingId');
    if (this.buildingId)
      this.subscription = this.global
        .get(`building/${this.buildingId}`)
        .subscribe((responseData) => {
          this.buildingInfo = responseData.data;
          this.editForm.patchValue({
            name: this.buildingInfo.name,
            buildNumber: this.buildingInfo.buildNumber,
          });
        });
  }
  selectImageHandler(event: any) {
    if (event.target.files.length == 0) return;
    this.buildingImagesFiles = [...event.target.files];
  }
  submitHandler(form: any) {
    const formData = new FormData();
    formData.append('name', form.value.name);
    if (form.value['buildNumber'] != this.buildingInfo.buildNumber)
      formData.append('buildNumber', form.value.buildNumber);
    if (this.buildingImagesFiles.length) {
      this.buildingImagesFiles.forEach((buildImageFile) => {
        formData.append('buildingImages', buildImageFile, buildImageFile.name);
      });
    }
    this.global
      .edit(`building/${this.buildingId}`, formData)
      .subscribe((response) => {
        this.buildingInfo = response.data;
        setTimeout(() => this.router.navigateByUrl('/admin/buildings'), 500);
      });
  }
}
