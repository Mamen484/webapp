import { inject, TestBed } from '@angular/core/testing';

import { ChannelResolveGuard } from './channel-resolve.guard';

describe('ChannelResolveGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ChannelResolveGuard]
        });
    });

    it('should ...', inject([ChannelResolveGuard], (guard: ChannelResolveGuard) => {
        expect(guard).toBeTruthy();
    }));
});
