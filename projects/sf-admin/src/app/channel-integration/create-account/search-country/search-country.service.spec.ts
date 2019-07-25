import { TestBed } from '@angular/core/testing';

import { SearchCountryService } from './search-country.service';

describe('SearchCountryService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: SearchCountryService = TestBed.get(SearchCountryService);
        expect(service).toBeTruthy();
    });
});
