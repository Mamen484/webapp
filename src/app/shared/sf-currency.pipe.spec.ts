import { SfCurrencyPipe } from './sf-currency.pipe';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';

describe('SfCurrencyPipe', () => {

    let pipe: SfCurrencyPipe;
    let appStore: Store<AppState>;

    beforeEach(() => {
        appStore = jasmine.createSpyObj(['pipe']);
        pipe = new SfCurrencyPipe(appStore, 'en-US');
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('return a currency symbol before the number when the currency is USD', () => {
        expect(pipe.transform(34, 'USD')).toEqual('$34.00');
    });
});
