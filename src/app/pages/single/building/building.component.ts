import { GlobalService } from './../../../services/global.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { buildingInterface } from 'src/app/interface/buildingInterface';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css'],
})
export class BuildingComponent {
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
  constructor(
    private activated: ActivatedRoute,
    private global: GlobalService
  ) {
    let buildingId = this.activated.snapshot.paramMap.get('buildingId');

    this.subscribe = this.global
      .get(`building/${buildingId}`)
      .subscribe((response) => {
        console.log(response);
        this.building = response.data;
      });
  }
  ngOnInit(): void {}
}
