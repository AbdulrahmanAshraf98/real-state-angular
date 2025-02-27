import { ProjectService } from './../../services/project.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  subscription: any;
  loading = false;
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.projectService.getAll(
      (response) => {},
      (error) => {},
      () => {
        this.loading = false;
      }
    );
  }
  get projects() {
    return this.projectService.projects;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
