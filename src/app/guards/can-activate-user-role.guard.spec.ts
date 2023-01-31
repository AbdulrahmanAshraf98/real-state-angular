import { TestBed } from '@angular/core/testing';

import { CanActivateUserRoleGuard } from './can-activate-user-role.guard';

describe('CanActivateUserRoleGuard', () => {
  let guard: CanActivateUserRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateUserRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
