import { SearchCountryDirective } from './search-country.directive';

describe('SearchCountryDirective', () => {
    it('should create an instance', () => {
        const searchService = jasmine.createSpyObj('SearchService spy', ['getResults']);
        const directive = new SearchCountryDirective(searchService);
        expect(directive).toBeTruthy();
    });
});
