import { TestBed, inject } from '@angular/core/testing';

import { LoadingFlagService } from './loading-flag.service';

describe('LoadingFlagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingFlagService]
    });
  });

  it('should be created', inject([LoadingFlagService], (service: LoadingFlagService) => {
    expect(service).toBeTruthy();
  }));
});
