import { Component } from '@angular/core';
import { buildingInterface } from 'src/app/interface/buildingInterface';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-all-buildings',
  templateUrl: './all-buildings.component.html',
  styleUrls: ['./all-buildings.component.css'],
})
export class AllBuildingsComponent {
  subscription: any;
  loading = false;
  buildings: buildingInterface[] = [];
  heads: string[] = [
    'id',
    'img',
    'name',
    'buildNumber',
    'floorNum',
    'totalUnits',
    'projectId',
    'actions',
  ];
  change: boolean = false;
  constructor(private global: GlobalService) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.global.get('building/').subscribe({
      next: (responseData) => {
        this.buildings = responseData.data;
        console.log(this.buildings);
      },
      error: (error) => console.log(error),
      complete: () => {
        this.loading = false;
      },
    });
  }
  ngDoCheck() {
    if (this.change) {
      this.loading = true;
      this.global.get('building/').subscribe({
        next: (responseData) => {
          this.buildings = responseData.data;
        },
        error: (error) => {},
        complete: () => {
          this.loading = false;
        },
      });
      this.change = false;
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  deleteBuildingHandler(buildingId: string, projectId: string) {
    this.global
      .delete(`building/${buildingId}`, { projectId })
      .subscribe((response) => {
        this.change = true;
      });
  }
}
