import { TestBed } from '@angular/core/testing';

import { AppcuesEnabledService } from './appcues-enabled.service';
import { take } from 'rxjs/operators';

describe('AppcuesEnabledService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppcuesEnabledService = TestBed.get(AppcuesEnabledService);
    expect(service).toBeTruthy();
  });

  it('should change state on setEnabled()', async () => {
    const service: AppcuesEnabledService = TestBed.get(AppcuesEnabledService);
    expect(await service.getState().pipe(take(1)).toPromise()).toBe(false);
    service.setEnabled();
    expect(await service.getState().pipe(take(1)).toPromise()).toBe(true);
  });
});
