import { ToastrService } from 'ngx-toastr';
import { UnitService } from './../../../../services/unit.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buy-unit',
  templateUrl: './buy-unit.component.html',
  styleUrls: ['./buy-unit.component.css'],
})
export class BuyUnitComponent {
  buyUnitForm: FormGroup;
  subscription: any;
  isSubmit: boolean = false;
  loading: boolean = false;
  unitId: any;
  paymentData: any;
  constructor(
    private unitService: UnitService,
    private activated: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.unitId = this.activated.snapshot.paramMap.get('unitId');
    this.buyUnitForm = new FormGroup({
      unitId: new FormControl(this.unitId, [Validators.required]),
      ownerEmail: new FormControl('', [Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
      numberOfYears: new FormControl(1, [
        Validators.required,
        Validators.min(1),
      ]),
      amountPaid: new FormControl(0, [Validators.required]),
    });
  }
  ngOnInit(): void {}

  submitHandler(form: any) {
    this.isSubmit = true;
    if (form.invalid) return;
    this.loading = true;
    this.subscription = this.unitService.buyUnit(
      form.value,
      (response) => {},
      (error) => {
        this.toastr.success('failed sold unit ', 'sold unit failed ');
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.router.navigateByUrl('/admin');
        this.toastr.success('unit sold successfully', 'unit sold ');
      }
    );
  }
}
