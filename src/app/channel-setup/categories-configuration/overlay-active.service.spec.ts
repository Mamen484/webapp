import { TestBed } from '@angular/core/testing';

import { OverlayActiveService } from './overlay-active.service';

describe('OverlayActiveService', () => {
  let service: OverlayActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
