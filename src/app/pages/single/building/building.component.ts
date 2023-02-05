import { BuildingService } from './../../../services/building.service';
import { GlobalService } from './../../../services/global.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { buildingInterface } from 'src/app/interface/buildingInterface';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css'],
})
export class BuildingComponent implements OnDestroy {
  subscribe: any;
  building: buildingInterface = {
    _id: '',
    name: '',
    projectId: '',
    buildNumber: 0,
    floorNum: 0,
    units: [],
    buildingImages: [],
  };
  loading = false;

  constructor(
    private activated: ActivatedRoute,
    private global: GlobalService,
    private buildingService: BuildingService
  ) {
    this.loading = true;
    let buildingId: any = this.activated.snapshot.paramMap.get('buildingId');
    this.subscribe = this.buildingService.getSingle(
      buildingId,
      (response) => {
        this.building = response.data;
      },
      () => {},
      () => {
        this.loading = false;
      }
    );
  }
  ngOnDestroy(): void {
    if (this.subscribe) this.subscribe.unsubscribe();
  }
}
