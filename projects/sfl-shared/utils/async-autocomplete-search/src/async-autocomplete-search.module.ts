import { NgModule } from '@angular/core';
import { SflAsyncAutocompleteSearchDirective } from './async-autocomplete-search.directive';

/**
 * A directive for an asynchronous autocomplete.
 *
 * You need to provide a SearchService to handle asynchronous search and a use directive to listen for the input.
 * (@see Injectables/SflSearchService)
 */
@NgModule({
    declarations: [SflAsyncAutocompleteSearchDirective],
    exports: [SflAsyncAutocompleteSearchDirective],
})
export class SflAsyncAutocompleteSearchModule {
}
