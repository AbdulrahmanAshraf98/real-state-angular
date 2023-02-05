import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/services/global.service';
import { Component } from '@angular/core';
import { UnitInterface } from 'src/app/interface/unit-interface';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-all-units',
  templateUrl: './all-units.component.html',
  styleUrls: ['./all-units.component.css'],
})
export class AllUnitsComponent {
  subscription: any;
  loading = false;

  heads: string[] = [
    '_id',
    'img',
    'name',
    'unitAddress',
    'price',
    'status',
    'buildingId',
    'createdBy',
    'owner',
    'actions',
  ];
  change: boolean = false;
  get units() {
    return this.uniteServices.units;
  }
  constructor(
    private uniteServices: UnitService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.uniteServices.getAll(
      (response) => {},
      (error) => {
        this.toastr.error('failed delete', 'failed to fetch data');
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  ngDoCheck() {
    if (this.change) {
      this.loading = true;
      this.subscription = this.uniteServices.getAll(
        (response) => {},
        (error) => {
          this.toastr.error('failed delete', 'failed to fetch data');
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
      this.change = false;
    }
  }

  deleteUnitHandler(unitId: string, buildingId: string) {
    this.subscription = this.uniteServices.delete(
      unitId,
      (response) => {},
      (error) => {
        this.loading = false;
        this.toastr.error('failed delete', error.error.message);
      },
      () => {
        this.change = true;
      },
      { buildingId }
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
