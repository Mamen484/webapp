import {Pipe, PipeTransform} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '../core/entities/app-state';
import {Store as UserStore} from 'sfl-shared/entities';
import {LocaleId} from '../core/entities/locale-id';
import {SflLocaleIdService} from 'sfl-shared/services';
import {LargeNumberFormat} from '../core/entities/large-number-format';

@Pipe({
    name: 'sfCurrency'
})
export class SfCurrencyPipe implements PipeTransform {

    protected country;

    constructor(protected appStore: Store<AppState>, protected localeIdService: SflLocaleIdService) {
        this.appStore.pipe(select('currentStore'))
            .subscribe((store: UserStore) => this.country = LocaleId.createFromCountryCode(store.country, this.localeIdService.localeId));
    }

    transform(value: number | string | LargeNumberFormat, currencyCode, fractionDigits = 2): string | null {
        const numberFormat = this.numberFormat(currencyCode, fractionDigits);
        const {number, suffix} = typeof value === 'number' || typeof value === 'string'
            ? {number: Number(value), suffix: ''}
            : value;

        if (!suffix) {
            return numberFormat.format(number);
        }
        const parts: any[] = numberFormat.formatToParts(number);
        const fractionIndex = parts.findIndex(part => part.type === 'fraction');
        parts.splice(fractionIndex + 1, 0, {type: 'literal', value: suffix});
        return parts.map(part => part.value).join('');

    }

    protected numberFormat(currencyCode: string, fractionDigits: number): any {
        return Intl.NumberFormat(this.country, {
                style: 'currency',
                currency: currencyCode,
                maximumFractionDigits: fractionDigits,
                minimumFractionDigits: fractionDigits
            }
        );
    }
}
