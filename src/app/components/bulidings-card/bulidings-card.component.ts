import { Component, Input } from '@angular/core';
import { buildingInterface } from 'src/app/interface/buildingInterface';

@Component({
  selector: 'app-bulidings-card',
  templateUrl: './bulidings-card.component.html',
  styleUrls: ['./bulidings-card.component.css'],
})
export class BulidingsCardComponent {
  @Input('items') buildings: buildingInterface[] = [];
}
