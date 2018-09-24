import { ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { filter, map, startWith, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatFormFieldAppearance, MatOption } from '@angular/material';
import { FullCountriesListService } from '../../core/services/full-countries-list.service';
import { Country } from '../../core/entities/country';


@Component({
    selector: 'sf-country-autocomplete',
    templateUrl: './country-autocomplete.component.html',
    styleUrls: ['./country-autocomplete.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CountryAutocompleteComponent),
            multi: true
        },
    ],
})
export class CountryAutocompleteComponent implements OnInit, ControlValueAccessor {

    @Input() appearance: MatFormFieldAppearance = 'standard';
    @Input() valid = true;

    @Input() set serverError(value) {
        this.validationError = value;
        this.changeDetectorRef.detectChanges();
        this.control.updateValueAndValidity();
    }

    protected validationError;

    countries: Country[] = [];
    filteredCountries: Observable<Country[]>;
    onChange: (value: string) => any;

    control = new FormControl('', () => this.validationError ? {serverError: true} : null);


    constructor(protected countriesListService: FullCountriesListService, protected changeDetectorRef: ChangeDetectorRef) {
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

    protected matchCountryByName(value: string) {
        return this.getCountries().pipe(map(countries => {
            return countries.find(({name}) => name === value);
        }));
    }


    protected getCountries() {
        return this.countriesListService.getCountries()
            .pipe(filter(countries => countries.length > 0), take(1));
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    writeValue(countryCode: string): void {
        if (countryCode) {
            this.formatDisplayedValue(countryCode);
        }
    }

    optionSelected({option}: { option: MatOption }) {
        this.matchCountryByName(option.value).subscribe((country: Country) => {
            if (country) {
                this.onChange(country.code);
            }
        });
    }


}
