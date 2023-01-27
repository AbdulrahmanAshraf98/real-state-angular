import { projectInterface } from 'src/app/interface/projectInterface';
import { GlobalService } from './../../services/global.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  subscription: any;
  projects: projectInterface[] = [];
  loading = false;
  constructor(private global: GlobalService) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.global.get('project/').subscribe(
      (responseData) => {
        this.projects = responseData.data;
      },
      (error) => console.log(error),
      () => {
        this.loading = false;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
