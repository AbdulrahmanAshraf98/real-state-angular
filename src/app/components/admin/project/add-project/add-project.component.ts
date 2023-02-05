import { ProjectService } from './../../../../services/project.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnDestroy {
  addProjectForm: FormGroup;
  subscription: any;
  isSubmit: boolean = false;
  loading: boolean = false;
  projectImagesFiles: any[] = [];
  constructor(
    private projectService: ProjectService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.addProjectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('buy', [Validators.required]),
      projectImages: new FormControl('', []),
    });
  }

  ngOnInit(): void {}
  selectImageHandler(event: any) {
    if (event.target.files.length == 0) return;
    this.projectImagesFiles = [...event.target.files];
  }
  submitHandler(form: any) {
    this.isSubmit = true;
    if (form.invalid) return;
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
    this.subscription = this.projectService.add(
      formData,
      (response) => {},
      (error) => {
        this.toastr.error('falied to add new project', 'project failed ');
      },
      () => {
        setTimeout(() => {}, 500);
        this.router.navigateByUrl('/admin');
        this.toastr.success(
          'project created successfully',
          'project  created '
        );
     
      }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
