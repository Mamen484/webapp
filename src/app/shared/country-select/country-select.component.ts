import { Component, Input, Self, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'sf-country-select',
    templateUrl: './country-select.component.html',
    styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent implements ControlValueAccessor {

    baseHref = environment.BASE_HREF + '/' + environment.LOCALE_ID;
    @Input() required = false;

    @ViewChild('select') select: HTMLSelectElement;

    onChange: (value: any) => void;
    onTouched: (value: any) => void;

    constructor(@Self() public controlDir: NgControl) {
        controlDir.valueAccessor = this;

    }

    writeValue(value: any): void {
        this.select.value = value;
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: (value: any) => void): void {
        this.onTouched = fn;
    }
}
