import { SfCurrencyPipe } from './sf-currency.pipe';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { Subject } from 'rxjs/Rx';
import { Store as UserStore } from '../core/entities/store';

describe('SfCurrencyPipe', () => {

    let pipe: SfCurrencyPipe;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let store$: Subject<UserStore>;

    beforeEach(() => {
        store$ = new Subject();
        appStore = jasmine.createSpyObj(['pipe']);
        appStore.pipe.and.returnValue(store$);
        pipe = new SfCurrencyPipe(appStore);
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('return a currency symbol before the number when the country is the US', () => {
        store$.next(<any>{country: 'en_US'});
        expect(pipe.transform(34, 'USD')).toEqual('$34.00');
    });

    it('return a currency symbol after the number when the country is France', () => {
        store$.next(<any>{country: 'fr_FR'});
        expect(pipe.transform(34, 'EUR')).toEqual('34,00 €');
    });
});
