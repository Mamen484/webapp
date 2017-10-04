import { TestBed, async, inject } from '@angular/core/testing';

import { InitializeStoreGuard } from './initialize-store.guard';

describe('InitializeStoreGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitializeStoreGuard]
    });
  });

  it('should ...', inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
    expect(guard).toBeTruthy();
  }));
});
