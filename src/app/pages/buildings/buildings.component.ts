import { BuildingService } from './../../services/building.service';
import { GlobalService } from './../../services/global.service';
import { buildingInterface } from './../../interface/buildingInterface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css'],
})
export class BuildingsComponent {
  subscription: any;
  // buildings: buildingInterface[] = [];
  loading = false;
  get buildings() {
    return this.buildingService.buildings;
  }
  constructor(
    private global: GlobalService,
    private buildingService: BuildingService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.buildingService.getAll(
      (response) => {},
      (error) => {},
      () => {
        this.loading = false;
      }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
