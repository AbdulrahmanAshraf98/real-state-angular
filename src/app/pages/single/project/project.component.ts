import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { projectInterface } from 'src/app/interface/projectInterface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnDestroy {
  subscribe: any;
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
    private global: GlobalService
  ) {
   ;
   
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }
  ngOnInit(): void {
    let projectId;
    this.activated.paramMap.subscribe((res) => {
      projectId = res.get('projectId');
    });
    this.subscribe = this.global
      .get(`project/${projectId}`)
      .subscribe((response) => {
        this.project = response.data;
      });
  }
}
