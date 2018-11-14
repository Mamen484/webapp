import { Component, Input, Self, ViewChild, Optional, Inject, LOCALE_ID } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { SFL_BASE_HREF } from 'sfl-shared/entities';

@Component({
    selector: 'sfl-country-select',
    templateUrl: './country-select.component.html',
    styleUrls: ['./country-select.component.scss'],
})
export class SflCountrySelectComponent implements ControlValueAccessor {

    baseHref: string;
    @Input() required = false;

    @ViewChild('select') select: HTMLSelectElement;

    onChange: (value: any) => void;
    onTouched: () => void;

    constructor(@Optional() @Self() public controlDir: NgControl, @Inject(LOCALE_ID) protected localeId, @Inject(SFL_BASE_HREF) protected sflBaseHref) {
        this.baseHref = `${sflBaseHref}/${localeId}`;
        if (controlDir) {
            controlDir.valueAccessor = this;
        }
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
}
