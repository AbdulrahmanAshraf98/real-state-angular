import { ToastrService } from 'ngx-toastr';
import { ProjectService } from './../../../services/project.service';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { projectInterface } from 'src/app/interface/projectInterface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnDestroy {
  subscribe: any;
  loading = false;
  project: projectInterface = {
    _id: '',
    name: '',
    type: '',
    createdBy: '',
    buildings: [],
    projectImages: [],
  };
  constructor(
    private activated: ActivatedRoute,
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    let projectId: string | null = '';

    this.activated.paramMap.subscribe((res) => {
      projectId = res.get('projectId');
    });
    this.subscribe = this.projectService.getSingle(
      projectId,
      (response) => {
        this.project = response.data;
      },
      (error) => {
        this.loading = false;
        this.toastr.error(error.message, 'failed to fetch');
      },
      () => {
        this.loading = false;
      }
    );
  }
  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }
}
