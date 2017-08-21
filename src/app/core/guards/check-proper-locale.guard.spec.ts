import { TestBed, async, inject } from '@angular/core/testing';

import { CheckProperLocaleGuard } from './check-proper-locale.guard';

describe('CheckProperLocaleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckProperLocaleGuard]
    });
  });

  it('should ...', inject([CheckProperLocaleGuard], (guard: CheckProperLocaleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
