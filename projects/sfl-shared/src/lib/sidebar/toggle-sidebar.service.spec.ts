import { TestBed, inject } from '@angular/core/testing';

import { SflToggleSidebarService } from './toggle-sidebar.service';

describe('ToggleSidebarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SflToggleSidebarService]
    });
  });

  it('should be created', inject([SflToggleSidebarService], (service: SflToggleSidebarService) => {
    expect(service).toBeTruthy();
  }));
});
