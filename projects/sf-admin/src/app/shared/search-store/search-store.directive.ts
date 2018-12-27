import { Directive } from '@angular/core';
import { SflAsyncAutocompleteSearchDirective, SflSearchService } from 'sfl-shared/utils/async-autocomplete-search';
import { SearchStoreService } from './search-store.service';

@Directive({
    selector: '[sfaSearchStore]',
    providers: [
        {provide: SflSearchService, useClass: SearchStoreService}
    ]
})
export class SearchStoreDirective extends SflAsyncAutocompleteSearchDirective {
}
