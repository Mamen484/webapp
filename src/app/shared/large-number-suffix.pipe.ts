import {Pipe, PipeTransform} from '@angular/core';
import {LargeNumberFormat} from '../core/entities/large-number-format';
import {Store} from '@ngrx/store';
import {AppState} from '../core/entities/app-state';
import {LocaleId} from '../core/entities/locale-id';
import {SflLocaleIdService} from 'sfl-shared/services';


@Pipe({
    name: 'largeNumberSuffix'
})
export class LargeNumberSuffixPipe implements PipeTransform {

    numberFormat: Intl.NumberFormat;

    constructor(protected appStore: Store<AppState>, protected localeIdService: SflLocaleIdService) {
        this.appStore.select('currentStore').subscribe(store => {
            this.numberFormat = Intl.NumberFormat(LocaleId.createFromCountryCode(store.country, localeIdService.localeId), {
                style: 'decimal',
                useGrouping: false,
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            });
        });
    }


    transform(value: number | string, returnObject = false): string | LargeNumberFormat {
        const {number, suffix} = this.formatNumber(Number(value));
        return returnObject
            ? {number, suffix}
            : this.numberFormat.format(number) + suffix;
    }

    protected formatNumber(value): LargeNumberFormat {
        if (value < 1e3) {
            return {number: value, suffix: ''};
        }
        if (value < 1e6) {
            return {number: value / 1e3, suffix: 'K'};
        }
        return {number: value / 1e6, suffix: 'M'};
    }
}
