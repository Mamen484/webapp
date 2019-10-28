import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FilterChannelsDialogComponent } from '../filter-channels-dialog/filter-channels-dialog.component';
import { ChannelsRequestParams, ChannelType, Country, SFL_COUNTRIES_LIST_LINK } from 'sfl-shared/entities';
import { FullCountriesListService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'sf-search-channels',
    templateUrl: './search-channels.component.html',
    styleUrls: ['./search-channels.component.scss'],
    providers: [
        FullCountriesListService,
        {provide: SFL_COUNTRIES_LIST_LINK, useValue: environment.countriesListLink},
    ],
})
export class SearchChannelsComponent {

    @Output() applyFilter = new EventEmitter();
    @Input() processing = false;
    @Input() filter: ChannelsRequestParams;

    countries = {};

    types = ChannelType;

    constructor(protected dialog: MatDialog, protected countriesListService: FullCountriesListService) {
        this.countriesListService.getCountries().subscribe((countries: Country[]) => {
            countries.forEach(country => this.countries[country.code] = country.name);
        });
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
