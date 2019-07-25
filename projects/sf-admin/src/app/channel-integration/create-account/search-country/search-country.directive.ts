import { Directive } from '@angular/core';
import { SflAsyncAutocompleteSearchDirective, SflSearchService } from 'sfl-shared/utils/async-autocomplete-search';
import { SearchCountryService } from './search-country.service';

@Directive({
    selector: '[sfaSearchCountry]',
    providers: [
        {provide: SflSearchService, useClass: SearchCountryService}
    ],
})
export class SearchCountryDirective extends SflAsyncAutocompleteSearchDirective {
}
