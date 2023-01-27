import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBuildingComponent } from './all-building.component';

describe('AllBuildingComponent', () => {
  let component: AllBuildingComponent;
  let fixture: ComponentFixture<AllBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBuildingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
