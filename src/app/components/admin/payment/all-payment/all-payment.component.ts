import { GlobalService } from './../../../../services/global.service';
import { Component } from '@angular/core';
import { PaymentInterface } from 'src/app/interface/payment-interface';

@Component({
  selector: 'app-all-payment',
  templateUrl: './all-payment.component.html',
  styleUrls: ['./all-payment.component.css'],
})
export class AllPaymentComponent {
  subscription: any;
  loading = false;
  change = false;
  heads = [
    '_id',
    'unit',
    'owner',
    'employee',
    'paymentMethod',
    'numberOfYears',
    'amountPaid',
    'remainingAmount',
    'totalPaidAmount',
    'requiredAmount',
    'actions',
  ];
  payments: PaymentInterface[] = [];
  constructor(private global: GlobalService) {}
  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.global.get('payment/').subscribe({
      next: (responseData) => {
        this.payments = responseData.data;
        console.log(this.payments);
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
      this.global.get('payment/').subscribe({
        next: (responseData) => {
          this.payments = responseData.data;
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
  paidHandler(paymentId: string, requiredAmount: number) {
    this.global
      .post(`payment/${paymentId}/newPaymentAmount`, {
        amountPaid: requiredAmount,
      })
      .subscribe((response) => {
        this.change = true;
      });
  }
  deletePaymentHandler(paymentId: string) {
    this.global.delete(`payment/${paymentId}`).subscribe((response) => {
      this.change = true;
    });
  }
}
