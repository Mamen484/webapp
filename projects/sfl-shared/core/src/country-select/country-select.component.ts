import { Component, Inject, Input, LOCALE_ID, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { SFL_BASE_HREF } from 'sfl-shared/entities';

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
export class SflCountrySelectComponent implements ControlValueAccessor {

    @Input() required = false;
    @ViewChild('select', {static: true}) select: HTMLSelectElement;

    baseHref: string;
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
