import { TestBed, async, inject } from '@angular/core/testing';

import { DefaultPageGuard } from './default-page.guard';

describe('DefaultPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultPageGuard]
    });
  });

  it('should ...', inject([DefaultPageGuard], (guard: DefaultPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
