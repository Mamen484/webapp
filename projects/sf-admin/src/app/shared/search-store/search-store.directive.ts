import {Directive} from '@angular/core';
import {SearchStoreService} from './search-store.service';
import {SftAsyncAutocompleteSearchDirective, SftSearchService} from 'sfl-tools/async-autocomplete-search';

@Directive({
    selector: '[sfaSearchStore]',
    providers: [
        {provide: SftSearchService, useClass: SearchStoreService}
    ]
})
export class SearchStoreDirective extends SftAsyncAutocompleteSearchDirective {
}
