import { Inject, LOCALE_ID, Pipe } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { Store as UserStore } from '../core/entities/store';
import { environment } from '../../environments/environment';

@Pipe({
    name: 'sfCurrency'
})
export class SfCurrencyPipe extends CurrencyPipe {

    protected country;

    constructor(protected appStore: Store<AppState>, @Inject(LOCALE_ID) localeId) {
        super(localeId);
        if (environment.production === 'true') {
            this.appStore.pipe(select('currentStore'))
                .subscribe((store: UserStore) => this.country = store.country && store.country.replace('_', '-'));
        } else {
            this.country = localeId;
        }

    }

    transform(value: any, currencyCode?: string, display?, digitsInfo?: string, locale = this.country): string | null {
        return super.transform(value, currencyCode, display, digitsInfo, locale);
    }
}
