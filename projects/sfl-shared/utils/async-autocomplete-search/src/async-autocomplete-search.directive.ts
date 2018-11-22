import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SflSearchService } from './search.service';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;

@Directive({
    selector: '[sflAsyncAutocompleteSearch]',
})
export class SflAsyncAutocompleteSearchDirective implements OnInit {
    @Input() searchControl: FormControl;
    @Output() searchResults = new EventEmitter();
    @Output() processingSearch = new EventEmitter<boolean>();

    searchSubscription: Subscription;

    constructor(protected searchService: SflSearchService<any>) {
    }

    ngOnInit() {
        this.searchControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery && searchQuery.length >= MIN_QUERY_LENGTH),
            tap(() => this.processingSearch.emit(true)),
            tap(searchQuery => this.handleNewSearch(searchQuery))
        )
            .subscribe();
    }

    handleNewSearch(searchQuery) {
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
        this.searchSubscription = this.searchService.getResults(searchQuery)
            .subscribe(data => {
                this.searchResults.emit(data);
                this.processingSearch.emit(false);
            });
    }
}
