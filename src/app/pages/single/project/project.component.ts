import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { projectInterface } from 'src/app/interface/projectInterface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
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
  ) {}
  ngOnInit(): void {
    let projectId = this.activated.snapshot.paramMap.get('projectId');
    this.global.get(`project/${projectId}`).subscribe((response) => {
      this.project = response.data;
    });
  }
}
