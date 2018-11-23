import { SearchStoreDirective } from './search-store.directive';
import { SflSearchService } from 'sfl-shared/utils/async-autocomplete-search';
import { FormControl } from '@angular/forms';

describe('SearchStoreDirective', () => {

    let searchService: jasmine.SpyObj<SflSearchService<any>>;
    let directive: SearchStoreDirective;

    beforeEach(() => {
        searchService = jasmine.createSpyObj('SflSearchService', ['getResults']);
        directive = new SearchStoreDirective(searchService);
        directive.searchControl = new FormControl();

    });
    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
});
