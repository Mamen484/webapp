import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject, Input,
    LOCALE_ID,
    OnInit,
    Optional,
    Self,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { countries } from './countries';
import { startWith, map, filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { MatFormFieldAppearance } from '@angular/material';

const defaultLang = 'en';

@Component({
    selector: 'sf-country-autocomplete',
    templateUrl: './country-autocomplete.component.html',
    styleUrls: ['./country-autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryAutocompleteComponent implements OnInit, ControlValueAccessor {

    @Input() appearance: MatFormFieldAppearance = 'standard';

    @ViewChild('input') input: ElementRef<HTMLInputElement>;

    baseHref = '';
    countries: { code: string, name: string }[];
    filteredCountries: Observable<{ code: string, name: string }[]>;

    onChange: (value: any) => void;
    onTouched: () => void;


    constructor(@Optional() @Self() public controlDir: NgControl,
                @Inject(LOCALE_ID) protected localeId) {
        this.baseHref = `${environment.BASE_HREF}/${localeId}`;
        this.countries = countries.map(country => ({code: country.code, name: country.name[this.localeId] || country.name[defaultLang]}));

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
            map(state => state ? this.filterCountries(state) : this.countries.slice())
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
        this.controlDir.control.valueChanges.pipe(
            filter(value => typeof value === 'string' && value.length === 2),
            take(1)
        ).subscribe(value => {
            let country = this.countries.find(({code}) => code === value);
            if (country) {
                this.controlDir.control.setValue(country.name);
                this.onChange(value);
            }
        });
    }


}
