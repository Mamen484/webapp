import {SearchBillingStoreDirective} from './search-billing-store.directive';
import {FormControl} from '@angular/forms';
import {SftSearchService} from 'sfl-tools/src/lib/async-autocomplete-search';

describe('SearchBillingStoreDirective', () => {

    let searchService: jasmine.SpyObj<SftSearchService<any>>;
    let directive: SearchBillingStoreDirective;

    beforeEach(() => {
        searchService = jasmine.createSpyObj('SftSearchService', ['getResults']);
        directive = new SearchBillingStoreDirective(searchService);
        directive.searchControl = new FormControl();

    });
    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
});
