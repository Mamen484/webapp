import {Directive} from '@angular/core';
import {SearchBillingStoreService} from './search-billing-store.service';
import {SftAsyncAutocompleteSearchDirective, SftSearchService} from 'sfl-tools/src/lib/async-autocomplete-search';

@Directive({
    selector: '[sfaSearchBillingStore]',
    providers: [
        {provide: SftSearchService, useClass: SearchBillingStoreService}
    ]
})
export class SearchBillingStoreDirective extends SftAsyncAutocompleteSearchDirective {
}
