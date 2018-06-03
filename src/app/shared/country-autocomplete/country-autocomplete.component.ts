import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, map, startWith, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatFormFieldAppearance } from '@angular/material';
import { FullCountriesListService } from '../../core/services/full-countries-list.service';
import { Country } from '../../core/entities/country';


@Component({
    selector: 'sf-country-autocomplete',
    templateUrl: './country-autocomplete.component.html',
    styleUrls: ['./country-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryAutocompleteComponent implements OnInit {

    @Input() appearance: MatFormFieldAppearance = 'standard';

    @Input()
    set value(value) {
        this.formatDisplayedValue(value);
    }

    @Output() valueChanged = new EventEmitter();

    countries: Country[] = [];
    filteredCountries: Observable<Country[]>;

    control = new FormControl();


    constructor(protected countriesListService: FullCountriesListService) {
    }

    ngOnInit() {
        this.getCountries().subscribe(countries => this.countries = countries);

        this.filteredCountries = this.control.valueChanges.pipe(
            startWith(''),
            map(state => state ? this.filterCountries(state) : this.countries.slice())
        );
    }

    protected filterCountries(name: string) {
        return this.countries.filter(country => country.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    /**
     * Ensure that we have fetched the countries list from the server,
     * then write to the input a country name according to the passed from parent country code.
     *
     * @param {string} value
     */
    protected formatDisplayedValue(value: string) {
        this.getCountries().subscribe(countries => {
            let c = countries.find(({code}) => code === value);
            this.control.setValue(c ? c.name : '');
        });
    }


    protected getCountries() {
        return this.countriesListService.getCountries()
            .pipe(filter(countries => countries.length > 0), take(1));
    }
}
