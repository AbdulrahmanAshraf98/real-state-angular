import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-pdf',
  templateUrl: './payment-pdf.component.html',
  styleUrls: ['./payment-pdf.component.css'],
})
export class PaymentPdfComponent {
  pdfSrc = '';
  constructor(private activated: ActivatedRoute) {
    const paymentId = this.activated.snapshot.paramMap.get('paymentId');
    this.pdfSrc = `http://localhost:8000/api/v1/public/pdf/${paymentId}.pdf`;
  }
}
