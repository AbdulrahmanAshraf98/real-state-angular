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
  projectInfo: projectInterface = {
    _id: '',
    name: '',
    type: '',
    createdBy: '',
    buildings: [],
    projectImages: [],
  };
  projectImagesFiles: any[] = [];
  constructor(
    private global: GlobalService,
    private activated: ActivatedRoute,
    private router: Router
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
        .subscribe((responseData) => {
          this.projectInfo = responseData.data;
          this.editForm.patchValue({
            name: this.projectInfo.name,
            type: this.projectInfo.type,
          });
        });
  }
  selectImageHandler(event: any) {
    if (event.target.files.length == 0) return;
    this.projectImagesFiles = [...event.target.files];
  }
  submitHandler(form: any) {
    const formData = new FormData();
    formData.append('name', form.value.name);
    if (form.value['type'] != this.projectInfo.type)
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
    this.global
      .edit(`project/${this.projectId}`, formData)
      .subscribe((response) => {
        this.projectInfo = response.data;
        setTimeout(() => this.router.navigateByUrl('/admin/projects'), 500);
      });
  }
}
