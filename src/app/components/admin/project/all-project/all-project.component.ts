import { Component, OnInit } from '@angular/core';
import { projectInterface } from 'src/app/interface/projectInterface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-all-project',
  templateUrl: './all-project.component.html',
  styleUrls: ['./all-project.component.css'],
})
export class AllProjectComponent implements OnInit {
  subscription: any;
  loading = false;
  projects: projectInterface[] = [];
  heads: string[] = ['id', 'img', 'name', 'type', 'actions'];
  change: boolean = false;
  constructor(private global: GlobalService) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.global.get('project/').subscribe({
      next: (responseData) => {
        this.projects = responseData.data;
        console.log(this.projects);
      },
      error: (error) => console.log(error),
      complete: () => {
        this.loading = false;
      },
    });
  }
  ngDoCheck() {
    if (this.change) {
      this.loading = true;
      this.global.get('project/').subscribe({
        next: (responseData) => {
          this.projects = responseData.data;
        },
        error: (error) => {},
        complete: () => {
          this.loading = false;
        },
      });
      this.change = false;
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  deleteUserHandler(projectId: string) {
    this.global.delete(`project/${projectId}`).subscribe((response) => {
      this.change = true;
    });
  }
}
