import { GlobalService } from 'src/app/services/global.service';
import { Component } from '@angular/core';
import { UnitInterface } from 'src/app/interface/unit-interface';

@Component({
  selector: 'app-all-units',
  templateUrl: './all-units.component.html',
  styleUrls: ['./all-units.component.css'],
})
export class AllUnitsComponent {
  subscription: any;
  loading = false;
  units: UnitInterface[] = [];
  heads: string[] = [
    '_id',
    'img',
    'name',
    'unitAddress',
    'price',
    'status',
    'buildingId',
    'createdBy',
    'buy',
    'show',
    'edit',
    'delete',
  ];
  change: boolean = false;
  constructor(private global: GlobalService) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.global.get('unit/').subscribe({
      next: (responseData) => {
        this.units = responseData.data;
        console.log(this.units);
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
      this.global.get('unit/').subscribe({
        next: (responseData) => {
          this.units = responseData.data;
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
  deleteUserHandler(unitId: string) {
    this.global.delete(`unit/${unitId}`).subscribe((response) => {
      this.change = true;
    });
  }
}
