import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SflSearchService } from './search.service';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;

/**
 * Use this directive to listen for an input, query get and output the results.
 * Don't forget to provide the SearchStore, getResults() of which will receive the search input text, and return the async results.
 *
 * @example
 *
 * <mat-form-field appearance="outline">
 *     <input matInput [formControl]="searchControl" [matAutocomplete]="auto" [searchControl]="searchControl"
 *        sflAsyncAutocompleteSearch (searchResults)="searchResults = $event" (processingSearch)="processing = $event">
 *     <mat-autocomplete #auto="matAutocomplete">
 *        <mat-option *ngFor="let result of searchResults" [value]="result">{{result}}</mat-option>
 *     </mat-autocomplete>
 * </mat-form-field>
 */
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
