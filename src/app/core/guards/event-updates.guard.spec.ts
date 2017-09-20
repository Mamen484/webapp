import { TestBed, async, inject } from '@angular/core/testing';

import { EventUpdatesGuard } from './event-updates.guard';

describe('EventUpdatesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventUpdatesGuard]
    });
  });

  it('should ...', inject([EventUpdatesGuard], (guard: EventUpdatesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
