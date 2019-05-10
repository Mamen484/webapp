import { inject, TestBed } from '@angular/core/testing';

import { StoreResolverGuard } from './store-resolver.guard';
import { BillingStoreService } from './store-list/billing-store.service';

describe('StoreResolverGuard', () => {
    let storeService: jasmine.SpyObj<BillingStoreService>;
    beforeEach(() => {
        storeService = jasmine.createSpyObj(['fetchStore']);
        TestBed.configureTestingModule({
            providers: [
                StoreResolverGuard,
                {provide: BillingStoreService, useValue: storeService}
            ]
        });
    });

    it('should return a billing store observable', inject([StoreResolverGuard], (guard: StoreResolverGuard) => {
        guard.resolve(<any>{params: {storeId: 27}}, <any>{});
        expect(storeService.fetchStore).toHaveBeenCalledWith(27);
    }));
});
