import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { projectInterface } from 'src/app/interface/projectInterface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  editForm: FormGroup;
  subscription: any;
  isSubmit: boolean = false;
  loading: boolean = false;
  projectId: any;
  projectImagesFiles: any[] = [];
  constructor(
    private global: GlobalService,
    private activated: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.projectId = this.activated.snapshot.paramMap.get('projectId');
    if (this.projectId)
      this.subscription = this.global
        .get(`project/${this.projectId}`)
        .subscribe({
          next: (responseData) => {
            this.editForm.patchValue(responseData.data);
          },
          error: () => {
            this.router.navigateByUrl('/admin');
            this.toastr.error('project not found', '404 not found ');
          },
          complete: () => {},
        });
  }
  selectImageHandler(event: any) {
    if (event.target.files.length == 0) return;
    this.projectImagesFiles = [...event.target.files];
  }
  submitHandler(form: any) {
    this.isSubmit = true;
    if (form.invalid) return;
    this.loading = true;
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('type', form.value.type);
    if (this.projectImagesFiles.length) {
      this.projectImagesFiles.forEach((projectImageFile) => {
        formData.append(
          'projectImages',
          projectImageFile,
          projectImageFile.name
        );
      });
    }
    this.global.edit(`project/${this.projectId}`, formData).subscribe({
      next: (response) => {},
      error: (error) => {
        this.router.navigateByUrl('/admin');
        this.toastr.error('project failed to edit', 'failed');
      },
      complete: () => {
        this.router.navigateByUrl('/admin');
        this.toastr.success('project edit successfully', 'project edit ');
      },
    });
  }
}
