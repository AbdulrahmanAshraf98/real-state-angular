import { ProjectService } from './../../../services/project.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-latest-project',
  templateUrl: './latest-project.component.html',
  styleUrls: ['./latest-project.component.css'],
})
export class LatestProjectComponent {
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
    return this.projectService.projects.slice(0, 6);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
