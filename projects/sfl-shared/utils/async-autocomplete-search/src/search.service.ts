import { Observable } from 'rxjs';

/**
 * Provide it in the component where you use sflAsyncAutocompleteSearch,
 * getResults accepts the search query and returns the results to appear in the autocomplete.
 */
export abstract class SflSearchService<T> {
    abstract getResults: (searchQuery: string) => Observable<T[]>;
}
