import { TestBed, async, inject } from '@angular/core/testing';

import { EventsResolveGuard } from './events-resolve.guard';

describe('EventsResolveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsResolveGuard]
    });
  });

  it('should ...', inject([EventsResolveGuard], (guard: EventsResolveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
