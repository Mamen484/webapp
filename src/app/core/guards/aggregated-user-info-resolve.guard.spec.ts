import { TestBed, inject } from '@angular/core/testing';

import { AggregatedUserInfoResolveGuard } from './aggregated-user-info-resolve.guard';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';

describe('AggregatedUserInfoResolveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          AggregatedUserInfoResolveGuard,
          {provide: UserService, useValue: {fetchAggregatedInfo: Observable.of({})}}
      ]
    });
  });

  it('should create', inject([AggregatedUserInfoResolveGuard], (guard: AggregatedUserInfoResolveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
