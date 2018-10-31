import { TestBed, inject } from '@angular/core/testing';

import { SflWindowRefService } from './window-ref.service';

describe('WindowRefService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SflWindowRefService]
    });
  });

  it('should be created', inject([SflWindowRefService], (service: SflWindowRefService) => {
    expect(service).toBeTruthy();
  }));
});
