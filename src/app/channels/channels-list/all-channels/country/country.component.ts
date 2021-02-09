import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/entities/app-state';
import { FullCountriesListService } from 'sfl-shared/services';
import { Country } from 'sfl-shared/entities';

@Component({
    selector: 'sf-channel-country',
    templateUrl: './country.component.html',
    styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

    @Input() defaultCountry;
    @Input() countriesNumber;

    storeCountry: string;
    fullCountriesList: Country[];

    constructor(private store: Store<AppState>,
                private countriesListService: FullCountriesListService) {
    }

    ngOnInit(): void {
        this.store.select('currentStore').subscribe(store => this.storeCountry = store.country);
        this.countriesListService.getCountries().subscribe(countries => {
            this.fullCountriesList = countries
                .map(country => Object.assign({}, country, {code: country.code.toLowerCase()}));

        });
    }

}
