import { inject, TestBed } from '@angular/core/testing';

import { InvoicesResolverGuard } from './invoices-resolver.guard';
import { BillingStoreService } from './store-list/billing-store.service';
import { EMPTY } from 'rxjs';

describe('InvoicesResolverGuard', () => {

    let storeService: jasmine.SpyObj<BillingStoreService>;
    beforeEach(() => {
        storeService = jasmine.createSpyObj(['fetchInvoicesCollection']);
        TestBed.configureTestingModule({
            providers: [
                InvoicesResolverGuard,
                {provide: BillingStoreService, useValue: storeService}
            ]
        });
    });

    it('should return a billing store observable', inject([InvoicesResolverGuard], (guard: InvoicesResolverGuard) => {
        storeService.fetchInvoicesCollection.and.returnValue(EMPTY);
        guard.resolve(<any>{params: {storeId: 27}}, <any>{});
        expect(storeService.fetchInvoicesCollection).toHaveBeenCalledWith(27);
    }));
});
