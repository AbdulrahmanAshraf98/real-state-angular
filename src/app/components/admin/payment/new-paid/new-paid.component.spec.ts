import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaidComponent } from './new-paid.component';

describe('NewPaidComponent', () => {
  let component: NewPaidComponent;
  let fixture: ComponentFixture<NewPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPaidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
