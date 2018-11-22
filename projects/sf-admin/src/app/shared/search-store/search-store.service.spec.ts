import { TestBed } from '@angular/core/testing';

import { SearchStoreService } from './search-store.service';

describe('SearchStoreService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: SearchStoreService = TestBed.get(SearchStoreService);
        expect(service).toBeTruthy();
    });
});
