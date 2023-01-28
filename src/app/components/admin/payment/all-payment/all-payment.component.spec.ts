import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPaymentComponent } from './all-payment.component';

describe('AllPaymentComponent', () => {
  let component: AllPaymentComponent;
  let fixture: ComponentFixture<AllPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
