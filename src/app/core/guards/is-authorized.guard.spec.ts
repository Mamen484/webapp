import { TestBed, async, inject } from '@angular/core/testing';

import { IsAuthorizedGuard } from './is-authorized.guard';

describe('IsAuthorizedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsAuthorizedGuard]
    });
  });

  it('should ...', inject([IsAuthorizedGuard], (guard: IsAuthorizedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
