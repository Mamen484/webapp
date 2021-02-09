import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs/operators';

const DEFAULT_SEARCH_DEBOUNCE = 300;
const DEFAULT_MIN_QUERY_LENGTH = 2;

/**
 * Solo search input
 */
@Component({
    selector: 'sft-solo-search',
    templateUrl: './solo-search.component.html',
    styleUrls: ['./solo-search.component.scss']
})
export class SoloSearchComponent implements OnInit {

    /** Minimum number of symbols typed into an input to trigger a search */
    @Input() minQueryLength = DEFAULT_MIN_QUERY_LENGTH;

    /** Search will be triggered after this delay. Indicates that a user has finished typing */
    @Input() searchDebounce = DEFAULT_SEARCH_DEBOUNCE;

    /** A text on a button, which opens a filtering dialog. If not specified, filter button won't displayed */
    @Input() filterButtonText = '';

    /** Placeholder of the input */
    @Input() placeholder = '';

    /** Indicates that the progress bar needs to be displayed */
    @Input() processing = false;

    /** Set a value of the input using this property */
    @Input() value = '';

    /** An event emitted when a user types a new search query */
    @Output() searchQueryChanged = new EventEmitter<string>();

    /** An event emitted when a user clicks a button to open filters */
    @Output() openFilters = new EventEmitter();


    searchControl = new FormControl();
    focused = false;

    ngOnInit() {
        this.searchControl.valueChanges.pipe(
            debounceTime(this.searchDebounce),
            filter(searchQuery => searchQuery.length >= this.minQueryLength || searchQuery === '')
        )
            .subscribe(searchQuery => this.searchQueryChanged.emit(searchQuery));
    }

}
