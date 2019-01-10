import { inject, TestBed } from '@angular/core/testing';

import { SetupResolverGuard } from './setup-resolver.guard';

describe('SetupResolverGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SetupResolverGuard]
        });
    });

    it('should ...', inject([SetupResolverGuard], (guard: SetupResolverGuard) => {
        expect(guard).toBeTruthy();
    }));
});
