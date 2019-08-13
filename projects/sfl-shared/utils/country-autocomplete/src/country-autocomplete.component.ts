import { ChangeDetectorRef, Component, forwardRef, Inject, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { filter, map, startWith, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatOption } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { FullCountriesListService } from './full-countries-list.service';
import { Country, SFL_COUNTRIES_LIST_LINK } from 'sfl-shared/entities';


@Component({
    selector: 'sfl-country-autocomplete',
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
    countries: Country[] = [];
    filteredCountries: Observable<Country[]>;
    onChange: (value: string) => any;
    protected validationError;
    control = new FormControl('', () => this.validationError ? {serverError: true} : null);

    constructor(@Inject(SFL_COUNTRIES_LIST_LINK) public countriesListLink,
                protected countriesListService: FullCountriesListService,
                protected changeDetectorRef: ChangeDetectorRef) {
    }

    @Input() set serverError(value) {
        this.validationError = value;
        this.changeDetectorRef.detectChanges();
        this.control.updateValueAndValidity();
    }

    ngOnInit() {
        this.getCountries().subscribe(countries => this.countries = countries);

        this.filteredCountries = this.control.valueChanges.pipe(
            startWith(''),
            map(state => state ? this.filterCountries(state) : this.countries.slice())
        );
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

    protected filterCountries(name: string) {
        return this.countries.filter(country => country.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    /**
     * Ensure that we have fetched the countries list from the server,
     * then write to the input a country name according to the passed from parent country code.
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


}
