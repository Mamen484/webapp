import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { debounceTime, filter, tap } from 'rxjs/operators';
import { FilterChannelsDialogComponent } from '../filter-channels-dialog/filter-channels-dialog.component';
import { ChannelsRequestParams } from '../../core/entities/channels-request-params';
import { ChannelType } from 'sfl-shared/entities';

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

    constructor(protected dialog: MatDialog) {
    }

    ngOnInit() {
        this.searchControl.valueChanges.pipe(
            debounceTime(SEARCH_DEBOUNCE),
            filter(searchQuery => searchQuery.length >= MIN_QUERY_LENGTH || searchQuery === ''),
            tap(searchQuery => this.filter.searchQuery = searchQuery),
        )
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
