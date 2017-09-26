import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { FilterChannelsDialogComponent } from '../filter-channels-dialog/filter-channels-dialog.component';
import { ChannelsRequestParams } from '../../core/entities/channels-request-params';
import { ChannelCategory } from '../../core/entities/channel-category.enum';
import { ChannelType } from '../../core/entities/channel-type.enum';
import { ChannelCountry } from '../../channel-country.enum';

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
    @Input() filter: ChannelsRequestParams;

    searchControl = new FormControl();
    types = ChannelType;

    constructor(protected dialog: MdDialog) {
    }

    ngOnInit() {
        this.searchControl.valueChanges
            .debounceTime(SEARCH_DEBOUNCE)
            .filter(searchQuery => searchQuery.length >= MIN_QUERY_LENGTH || searchQuery === '')
            .do(searchQuery => this.filter.searchQuery = searchQuery)
            .subscribe(searchQuery => this.applyFilter.emit(this.filter));
    }

    openDialog() {
        let dialogRef = this.dialog.open(FilterChannelsDialogComponent, {data: this.filter});
        dialogRef.afterClosed().subscribe((data: ChannelsRequestParams) => {
            if (!data) {
                return;
            }
            this.filter.type = data.type;
            this.filter.country = data.country;
            this.filter.segment = data.segment;
            this.applyFilter.emit(this.filter);
        });
    }

    cancelFilter(filterName) {
        this.filter[filterName] = '';
        this.applyFilter.emit(this.filter);
    }

}
