import { TestBed, inject } from '@angular/core/testing';

import { CanLoadAdminGuard } from './can-load-admin.guard';

describe('CanLoadAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanLoadAdminGuard]
    });
  });

  it('should ...', inject([CanLoadAdminGuard], (guard: CanLoadAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
