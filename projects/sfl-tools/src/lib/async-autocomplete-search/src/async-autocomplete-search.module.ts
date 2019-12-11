import { NgModule } from '@angular/core';
import { SftAsyncAutocompleteSearchDirective } from './async-autocomplete-search.directive';

/**
 * A directive for an asynchronous autocomplete.
 *
 * You need to provide a SearchService to handle asynchronous search and a use directive to listen for the input.
 * (@see Injectables/SftSearchService)
 */
@NgModule({
    declarations: [SftAsyncAutocompleteSearchDirective],
    exports: [SftAsyncAutocompleteSearchDirective],
})
export class SflAsyncAutocompleteSearchModule {
}
