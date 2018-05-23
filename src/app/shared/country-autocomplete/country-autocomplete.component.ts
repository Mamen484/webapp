import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { filter, map, startWith, take } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';
import { MatFormFieldAppearance } from '@angular/material';
import { FullCountriesListService } from '../../core/services/full-countries-list.service';
import { Country } from '../../core/entities/country';


@Component({
    selector: 'sf-country-autocomplete',
    templateUrl: './country-autocomplete.component.html',
    styleUrls: ['./country-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryAutocompleteComponent implements OnInit, ControlValueAccessor {

    @Input() appearance: MatFormFieldAppearance = 'standard';
    @ViewChild('input') input: ElementRef<HTMLInputElement>;

    countries: Country[] = [];
    filteredCountries: Observable<Country[]>;

    onChange: (value: any) => void;
    onTouched: () => void;


    constructor(@Optional() @Self() public controlDir: NgControl,
                protected countriesListService: FullCountriesListService) {

        if (controlDir) {
            controlDir.valueAccessor = this;
        }
    }

    ngOnInit() {
        if (!this.controlDir) {
            return;
        }
        this.filteredCountries = this.controlDir.control.valueChanges.pipe(
            startWith(''),
            map(state =>  state ? this.filterCountries(state) : this.countries.slice())
        );
        this.initializeFirstValue();
    }

    writeValue(value: any): void {
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    protected filterCountries(name: string) {
        return this.countries.filter(country => country.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }

    protected initializeFirstValue() {
        zip(this.controlDir.control.valueChanges.pipe(
            filter(value => typeof value === 'string'),
            take(1)
        ), this.countriesListService.getCountries().pipe(filter(countries => countries.length > 0))).pipe(take(1))
            .subscribe(([value, countries]) => {
                this.countries = countries;
                let country = this.countries.find(({code}) => code === value);
                this.controlDir.control.setValue(country ? country.name : '');
                this.onChange(value);
            });
    }
}
