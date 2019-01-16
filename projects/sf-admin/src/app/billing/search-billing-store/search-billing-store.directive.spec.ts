import { SearchBillingStoreDirective } from './search-billing-store.directive';
import { SflSearchService } from 'sfl-shared/utils/async-autocomplete-search';
import { FormControl } from '@angular/forms';

describe('SearchBillingStoreDirective', () => {

    let searchService: jasmine.SpyObj<SflSearchService<any>>;
    let directive: SearchBillingStoreDirective;

    beforeEach(() => {
        searchService = jasmine.createSpyObj('SflSearchService', ['getResults']);
        directive = new SearchBillingStoreDirective(searchService);
        directive.searchControl = new FormControl();

    });
    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
});
