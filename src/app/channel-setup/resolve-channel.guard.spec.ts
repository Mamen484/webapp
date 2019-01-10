import { inject, TestBed } from '@angular/core/testing';

import { ResolveChannelGuard } from './resolve-channel.guard';

describe('ResolveChannelGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ResolveChannelGuard]
        });
    });

    it('should ...', inject([ResolveChannelGuard], (guard: ResolveChannelGuard) => {
        expect(guard).toBeTruthy();
    }));
});
