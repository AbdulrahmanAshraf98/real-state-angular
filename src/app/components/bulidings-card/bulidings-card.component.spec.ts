import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulidingsCardComponent } from './bulidings-card.component';

describe('BulidingsCardComponent', () => {
  let component: BulidingsCardComponent;
  let fixture: ComponentFixture<BulidingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulidingsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulidingsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
