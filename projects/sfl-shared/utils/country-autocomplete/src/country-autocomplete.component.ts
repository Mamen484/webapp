import { ChangeDetectorRef, Component, forwardRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
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

    @ViewChild('input', {static: false}) input;

    @Input() appearance: MatFormFieldAppearance = 'standard';
    @Input() valid = true;
    @Input() multipleSelection: 'none' | 'chips' = 'none';
    @Input() required = false;
    @Input() hintText = '';
    countries: Country[] = [];
    filteredCountries: Observable<Country[]>;
    onChange: (value: string | string[]) => any;
    selectedCountries = [];
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

    writeValue(value: string | string[]): void {
        if (value) {
            this.formatDisplayedValue(value);
        }
    }

    optionSelected({option}: { option: MatOption }) {
        this.matchCountryByName(option.value).subscribe((country: Country) => {
            if (country) {
                if (this.multipleSelection === 'chips') {
                    if (this.selectedCountries.indexOf(country) === -1) {
                        this.selectedCountries.push(country);
                    }
                    this.onChange(this.selectedCountries.map(({code}) => code));
                    this.control.reset('');
                    this.input.nativeElement.value = '';
                } else {
                    this.onChange(country.code);
                }
            }
        });
    }

    remove(country) {
        this.selectedCountries.splice(this.selectedCountries.indexOf(country), 1);
        this.onChange(this.selectedCountries);
    }

    protected filterCountries(name: string) {
        return this.countries.filter(country => country.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    /**
     * Ensure that we have fetched the countries list from the server,
     * then write to the input a country name according to the passed from parent country code.
     */
    protected formatDisplayedValue(value: string | string[]) {
        this.getCountries().subscribe(countries => {
            if (typeof value === 'string') {
                let c = countries.find(({code}) => code === value);
                this.control.setValue(c ? c.name : '');
            } else {
                this.selectedCountries = value.map((countryCode: string) => countries.find(({code}) => code === countryCode));
            }

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
