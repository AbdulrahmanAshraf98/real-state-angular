import { ProjectService } from './../../../../services/project.service';
import { BuildingService } from './../../../../services/building.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GlobalService } from './../../../../services/global.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { projectInterface } from 'src/app/interface/projectInterface';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.css'],
})
export class AddBuildingComponent {
  addBuildingForm: FormGroup;
  subscription: any;
  isSubmit = false;
  loading = false;
  buildingImagesFiles: any[] = [];

  get projects() {
    return this.projectService.projects;
  }
  constructor(
    private projectService: ProjectService,
    private buildingService: BuildingService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.addBuildingForm = new FormGroup({
      projectId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      buildNumber: new FormControl('', [Validators.required]),
      BuildingImages: new FormControl('', []),
    });
  }
  ngOnInit() {
    this.subscription = this.projectService.getAll(
      (response) => {},
      () => {},
      () => {}
    );
  }
  selectImageHandler(event: any) {
    if (event.target.files.length == 0) return;
    this.buildingImagesFiles = [...event.target.files];
  }
  submitHandler(form: FormGroup) {
    this.isSubmit = true;
    if (form.invalid) return;
    this.loading = true;
    const formData = new FormData();
    formData.append('projectId', form.value.projectId);
    formData.append('name', form.value.name);
    formData.append('buildNumber', form.value.buildNumber);
    if (this.buildingImagesFiles.length) {
      this.buildingImagesFiles.forEach((buildImageFile) => {
        formData.append('buildingImages', buildImageFile, buildImageFile.name);
      });
    }
    this.subscription = this.buildingService.add(
      formData,
      (response) => {},
      (error) => {
        this.toastr.error(
          'failed to add new building',
          'building create failed '
        );
      },
      () => {
        this.loading = false;
        this.router.navigateByUrl('/admin');
        this.toastr.success(
          'building created successfully',
          'building  created '
        );
      }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
