import { TestBed, async, inject } from '@angular/core/testing';

import { AggregatedUserInfoResolveGuard } from './aggregated-user-info-resolve.guard';

describe('AggregatedUserInfoResolveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AggregatedUserInfoResolveGuard]
    });
  });

  it('should ...', inject([AggregatedUserInfoResolveGuard], (guard: AggregatedUserInfoResolveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
