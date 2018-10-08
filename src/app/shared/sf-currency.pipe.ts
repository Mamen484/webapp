import { Pipe, PipeTransform } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { Store as UserStore } from '../core/entities/store';

@Pipe({
    name: 'sfCurrency'
})
export class SfCurrencyPipe implements PipeTransform {

    protected country;

    constructor(protected appStore: Store<AppState>) {
        this.appStore.pipe(select('currentStore'))
            .subscribe((store: UserStore) => this.country = store.country && store.country.replace('_', '-'));
    }

    transform(value: any, currencyCode, maximumFractionDigits = 2): string | null {
        return Intl.NumberFormat(this.country, {style: 'currency', currency: currencyCode, maximumFractionDigits, minimumFractionDigits: 0}).format(value);
    }
}
