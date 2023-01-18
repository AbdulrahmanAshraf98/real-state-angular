import { Component, Input } from '@angular/core';
import { projectInterface } from 'src/app/interface/projectInterface';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  @Input('project') project: projectInterface = {
    _id: '',
    name: '',
    type: '',
    createdBy: '',
    buildings: [],
    projectImages: [],
  };
}
