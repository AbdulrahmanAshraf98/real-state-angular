import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { projectInterface } from 'src/app/interface/projectInterface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent {
  addProjectForm: FormGroup;
  subscription: any;
  isSubmit: boolean = false;
  loading: boolean = false;

  projectImagesFiles: any[] = [];
  constructor(private global: GlobalService, private router: Router) {
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
    this.global.post(`project/`, formData).subscribe((response) => {
      setTimeout(() => {
        this.router.navigateByUrl('/admin');
      }, 500);
    });
  }
}
