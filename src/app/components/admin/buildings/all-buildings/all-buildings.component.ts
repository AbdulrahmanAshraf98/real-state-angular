import { ToastrService } from 'ngx-toastr';
import { BuildingService } from './../../../../services/building.service';
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
  get buildings() {
    return this.buildingService.buildings;
  }
  constructor(
    private buildingService: BuildingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.buildingService.getAll(
      (response) => {},
      (error) => {
        this.toastr.error(error.message, 'failed to fetch');
      },
      () => {
        this.loading = false;
      }
    );
  }
  ngDoCheck() {
    if (this.change) {
      this.loading = true;
      this.subscription = this.buildingService.getAll(
        (response) => {},
        (error) => {
          this.toastr.error(error.message, 'failed to fetch');
        },
        () => {
          this.loading = false;
        }
      );
      this.change = false;
    }
  }

  deleteBuildingHandler(buildingId: string, projectId: string) {
    this.subscription = this.buildingService.delete(
      buildingId,
      () => {},
      (error) => {
        this.toastr.error(error.error.message, 'failed to delete');
      },
      () => {},
      { projectId }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
