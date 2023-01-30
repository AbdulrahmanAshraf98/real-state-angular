import { GlobalService } from 'src/app/services/global.service';
import { UnitInterface } from 'src/app/interface/unit-interface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css'],
})
export class UnitsComponent {
  subscription: any;
  units: UnitInterface[] = [];
  loading = false;
  constructor(private global: GlobalService) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.global.get('unit/').subscribe(
      (responseData) => {
        this.units = responseData.data;
      },
      (error) => console.log(error),
      () => {
        this.loading = false;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
