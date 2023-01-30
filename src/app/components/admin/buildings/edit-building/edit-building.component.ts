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
    private global: GlobalService,
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
    if (this.buildingId)
      this.subscription = this.global
        .get(`building/${this.buildingId}`)
        .subscribe((responseData) => {
          this.editForm.patchValue(responseData.data);
        });
  }
  selectImageHandler(event: any) {
    if (event.target.files.length == 0) return;
    this.buildingImagesFiles = [...event.target.files];
  }
  submitHandler(form: any) {
    this.loading = true;
    if (form.invalid) {
      this.loading = false;
      return;
    }
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('buildNumber', form.value.buildNumber);
    if (this.buildingImagesFiles.length) {
      this.buildingImagesFiles.forEach((buildImageFile) => {
        formData.append('buildingImages', buildImageFile, buildImageFile.name);
      });
    }
    this.global.edit(`building/${this.buildingId}`, formData).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigateByUrl('/admin');
      },
      error: () => {
        this.router.navigateByUrl('/admin');
        this.toastr.error('building failed to edit', 'failed');
      },
      complete: () => {
        this.router.navigateByUrl('/admin');
        this.toastr.success('building edit successfully', 'building edit ');
      },
    });
  }
}
