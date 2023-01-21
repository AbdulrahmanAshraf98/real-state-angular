import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgerPasswordComponent } from './forger-password.component';

describe('ForgerPasswordComponent', () => {
  let component: ForgerPasswordComponent;
  let fixture: ComponentFixture<ForgerPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgerPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgerPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
