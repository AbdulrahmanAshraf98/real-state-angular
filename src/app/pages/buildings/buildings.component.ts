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
  buildings: buildingInterface[] = [];
  loading = false;
  constructor(private global: GlobalService) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.global.get('building/').subscribe(
      (responseData) => {
        this.buildings = responseData.data;
        console.log(this.buildings);
      },
      (error) => {},
      () => {
        this.loading = false;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
