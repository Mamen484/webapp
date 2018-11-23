import { TestBed } from '@angular/core/testing';

import { SearchStoreService } from './search-store.service';
import { StoreService } from 'sfl-shared/services';
import { EMPTY } from 'rxjs';

describe('SearchStoreService', () => {

    let storeService: jasmine.SpyObj<StoreService>;

    beforeEach(() => {

        storeService = jasmine.createSpyObj('StoreService', ['fetchAvailableStores']);
        TestBed.configureTestingModule({
            providers: [
                SearchStoreService,
                {provide: StoreService, useValue: storeService}
            ],
        });
    });

    it('should be created', () => {
        const service: SearchStoreService = TestBed.get(SearchStoreService);
        expect(service).toBeTruthy();
    });

    it('should call fetchAvailableStores() on getResults()', () => {
        storeService.fetchAvailableStores.and.returnValue(EMPTY);
        const service: SearchStoreService = TestBed.get(SearchStoreService);
        service.getResults();
        expect(storeService.fetchAvailableStores).toHaveBeenCalled();
    });
});
