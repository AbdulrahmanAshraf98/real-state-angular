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
    private global: GlobalService,
    private activated: ActivatedRoute,
    private router: Router
  ) {
    this.unitId = this.activated.snapshot.paramMap.get('unitId');
    this.buyUnitForm = new FormGroup({
      unitId: new FormControl(this.unitId, [Validators.required]),
      ownerEmail: new FormControl('', [Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
      numberOfYears: new FormControl(1, [Validators.required]),
      amountPaid: new FormControl(0, [Validators.required]),
    });
  }
  ngOnInit(): void {}

  submitHandler(form: any) {
    if (form.invalid) return;
    this.global.post(`unit/sellUnit`, form.value).subscribe((response) => {
      console.log(response);
    });
  }
}
