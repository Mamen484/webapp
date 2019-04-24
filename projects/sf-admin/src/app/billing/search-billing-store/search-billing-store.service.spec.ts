import { TestBed } from '@angular/core/testing';

import { SearchBillingStoreService } from './search-billing-store.service';
import { of } from 'rxjs';
import { BillingStoreService } from '../store-list/billing-store.service';

describe('SearchBillingStoreService', () => {

    let storeService: jasmine.SpyObj<BillingStoreService>;

    beforeEach(() => {

        storeService = jasmine.createSpyObj('BillingStoreService', ['fetchStoreCollection']);
        TestBed.configureTestingModule({
            providers: [
                SearchBillingStoreService,
                {provide: BillingStoreService, useValue: storeService}
            ],
        });
    });

    it('should be created', () => {
        const service: SearchBillingStoreService = TestBed.get(SearchBillingStoreService);
        expect(service).toBeTruthy();
    });

    it('should call fetchAvailableStores() on getResults()', async () => {
        storeService.fetchStoreCollection.and.returnValue(of(<any>{_embedded: {store: []}}));
        const service: SearchBillingStoreService = TestBed.get(SearchBillingStoreService);
        expect(await service.getResults().toPromise()).toEqual([]);
        expect(storeService.fetchStoreCollection).toHaveBeenCalled();
    });
});
