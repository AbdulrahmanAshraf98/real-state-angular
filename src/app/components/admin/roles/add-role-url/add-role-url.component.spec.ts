import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleUrlComponent } from './add-role-url.component';

describe('AddRoleUrlComponent', () => {
  let component: AddRoleUrlComponent;
  let fixture: ComponentFixture<AddRoleUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoleUrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoleUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
