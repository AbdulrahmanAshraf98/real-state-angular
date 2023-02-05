import { ToastrService } from 'ngx-toastr';
import { ProjectService } from './../../../../services/project.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { projectInterface } from 'src/app/interface/projectInterface';

@Component({
  selector: 'app-all-project',
  templateUrl: './all-project.component.html',
  styleUrls: ['./all-project.component.css'],
})
export class AllProjectComponent implements OnInit, OnDestroy {
  subscription: any;
  loading = false;

  heads: string[] = ['id', 'img', 'name', 'type', 'actions'];
  change: boolean = false;
  constructor(
    private projectService: ProjectService,
    private toastr: ToastrService
  ) {}
  get projects() {
    return this.projectService.projects;
  }
  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.projectService.getAll(
      (response) => {
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.toastr.error(error.message, 'failed to fetch');
      },
      () => {}
    );
  }

  ngDoCheck() {
    if (this.change) {
      this.subscription = this.projectService.getAll(
        (response) => {},
        (error) => {
          this.toastr.error(error.message, 'failed to fetch');
        },
        () => {}
      );
      this.change = false;
    }
  }

  deleteProjectHandler(projectId: string) {
    this.projectService.delete(
      projectId,
      (response) => {
        this.change = true;
      },
      (error) => {
        this.toastr.error(error.error.message, 'failed to delete');
      },
      () => {}
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
