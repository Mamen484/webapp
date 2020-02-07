import { SearchStoreDirective } from './search-store.directive';
import { FormControl } from '@angular/forms';
import {SftSearchService} from 'sfl-tools/async-autocomplete-search';

describe('SearchStoreDirective', () => {

    let searchService: jasmine.SpyObj<SftSearchService<any>>;
    let directive: SearchStoreDirective;

    beforeEach(() => {
        searchService = jasmine.createSpyObj('SftSearchService', ['getResults']);
        directive = new SearchStoreDirective(searchService);
        directive.searchControl = new FormControl();

    });
    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
});
