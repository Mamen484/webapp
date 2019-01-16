import { Directive } from '@angular/core';
import { SflAsyncAutocompleteSearchDirective, SflSearchService } from 'sfl-shared/utils/async-autocomplete-search';
import { SearchBillingStoreService } from './search-billing-store.service';

@Directive({
    selector: '[sfaSearchBillingStore]',
    providers: [
        {provide: SflSearchService, useClass: SearchBillingStoreService}
    ]
})
export class SearchBillingStoreDirective extends SflAsyncAutocompleteSearchDirective {
}
