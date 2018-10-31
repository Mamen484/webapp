import { Pipe, PipeTransform } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { Store as UserStore } from 'sfl-shared/src/lib/core/entities';

const countryLocalePairs = {
    us: 'en-US',
    uk: 'en-GB',
    ca: 'en-CA',
    au: 'en-AU',
    in: 'en-IN',
    br: 'pt-BR'
};

@Pipe({
    name: 'sfCurrency'
})
export class SfCurrencyPipe implements PipeTransform {

    protected country;

    constructor(protected appStore: Store<AppState>) {
        this.appStore.pipe(select('currentStore'))
            .subscribe((store: UserStore) => {
                this.country = store.country && store.country.replace('_', '-');
                this.country = countryLocalePairs[this.country.toLowerCase()] || this.country;
            });
    }

    transform(value: any, currencyCode, fractionDigits = 2): string | null {
        return Intl.NumberFormat(this.country, {
                style: 'currency',
                currency: currencyCode,
                maximumFractionDigits: fractionDigits,
                minimumFractionDigits: fractionDigits
            }
        ).format(value);
    }
}
