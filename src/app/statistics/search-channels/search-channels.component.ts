import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

const SEARCH_DEBOUNCE = 300;
const MIN_QUERY_LENGTH = 2;

@Component({
    selector: 'sf-search-channels',
    templateUrl: './search-channels.component.html',
    styleUrls: ['./search-channels.component.scss']
})
export class SearchChannelsComponent implements OnInit {

    @Output() applyFilter = new EventEmitter();
    @Input() processing = false;
    searchControl = new FormControl();

    constructor() {
    }

    ngOnInit() {
        this.searchControl.valueChanges
            .debounceTime(SEARCH_DEBOUNCE)
            .filter(searchQuery => searchQuery.length >= MIN_QUERY_LENGTH || searchQuery === '')
            .subscribe(searchQuery => this.applyFilter.emit({type: 'name', data: searchQuery}));
    }

}
