import { Component, Input, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Country } from 'sfl-shared/entities';
import { filter, take } from 'rxjs/operators';
import { FullCountriesListService } from 'sfl-shared/services';

/**
 * A dropdown to choose a country, where one can sell goods using Shopping Feed.
 * Implements ControlValueAccessor, so can be used as a normal input.
 *
 * @example
 *
 * <sfl-country-select [(ngModel)]="filter.country"></sfl-country-select>
 */
@Component({
    selector: 'sfl-country-select',
    templateUrl: './country-select.component.html',
    styleUrls: ['./country-select.component.scss'],
})
export class SflCountrySelectComponent implements ControlValueAccessor, OnInit {

    @Input() required = false;
    @ViewChild('select', {static: true}) select: HTMLSelectElement;

    allowedCodes = [
        'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cz', 'de', 'dk', 'ee', 'es',
        'fi', 'fr', 'gr', 'hr', 'hu', 'ie', 'in', 'it', 'jp', 'lt', 'lv', 'mx',
        'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'se', 'si', 'sk', 'sl', 'th', 'tr', 'uk', 'us'];
    countries: Country[] = [];
    onChange: (value: any) => void;
    onTouched: () => void;

    constructor(@Optional() @Self() public controlDir: NgControl,
                protected countriesListService: FullCountriesListService) {
        if (controlDir) {
            controlDir.valueAccessor = this;
        }
    }

    ngOnInit() {
        this.getCountries().subscribe(countries => this.countries = this.allowedCodes
            ? countries.filter(country => this.allowedCodes.indexOf(country.code.toLowerCase()) !== -1)
            : countries);
    }

    writeValue(value: any): void {
        this.select.value = value;
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    protected getCountries() {
        return this.countriesListService.getCountries()
            .pipe(filter(countries => countries.length > 0), take(1));
    }
}
