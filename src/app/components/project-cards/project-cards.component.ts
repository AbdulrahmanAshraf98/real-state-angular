import { Component, Input } from '@angular/core';
import { projectInterface } from 'src/app/interface/projectInterface';

@Component({
  selector: 'app-project-cards',
  templateUrl: './project-cards.component.html',
  styleUrls: ['./project-cards.component.css'],
})
export class ProjectCardsComponent {
  @Input('projectItems') projects: projectInterface[] = [];
}
