import { SfCurrencyPipe } from './sf-currency.pipe';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { Subject } from 'rxjs/Rx';
import { Store as UserStore } from 'sfl-shared/src/lib/core/entities';

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

    it('return a currency symbol before the number when the country is the en_US', () => {
        store$.next(<any>{country: 'en_US'});
        expect(pipe.transform(34, 'USD')).toEqual('$34.00');
    });

    it('return a currency symbol before the number when the country is the US', () => {
        store$.next(<any>{country: 'US'});
        expect(pipe.transform(34, 'USD')).toEqual('$34.00');
    });

    it('return a currency symbol before the number when the country is the en_GB', () => {
        store$.next(<any>{country: 'en_GB'});
        expect(pipe.transform(34, 'GBP')).toEqual('£34.00');
    });

    it('return a currency symbol before the number when the country is the uk', () => {
        store$.next(<any>{country: 'uk'});
        expect(pipe.transform(34, 'GBP')).toEqual('£34.00');
    });

    it('return a currency symbol after the number when the country is fr_FR', () => {
        store$.next(<any>{country: 'fr_FR'});
        expect(pipe.transform(34, 'EUR')).toEqual('34,00 €');
    });

    it('return a currency symbol after the number when the country is fr', () => {
        store$.next(<any>{country: 'fr'});
        expect(pipe.transform(34, 'EUR')).toEqual('34,00 €');
    });

    it('return a currency symbol after the number when the country is de', () => {
        store$.next(<any>{country: 'de'});
        expect(pipe.transform(34, 'EUR')).toEqual('34,00 €');
    });

    it('return a currency symbol after the number when the country is de_DE', () => {
        store$.next(<any>{country: 'de_DE'});
        expect(pipe.transform(34, 'EUR')).toEqual('34,00 €');
    });

    it('return a currency symbol after the number when the country is es', () => {
        store$.next(<any>{country: 'es'});
        expect(pipe.transform(34, 'EUR')).toEqual('34,00 €');
    });

    it('return a currency symbol after the number when the country is es-ES', () => {
        store$.next(<any>{country: 'es-ES'});
        expect(pipe.transform(34, 'EUR')).toEqual('34,00 €');
    });

    it('return a currency symbol after the number when the country is it', () => {
        store$.next(<any>{country: 'it'});
        expect(pipe.transform(34, 'EUR')).toEqual('34,00 €');
    });

    it('return a currency symbol after the number when the country is it-IT', () => {
        store$.next(<any>{country: 'it-IT'});
        expect(pipe.transform(34, 'EUR')).toEqual('34,00 €');
    });

    it('return a currency symbol after the number when the country is ca', () => {
        store$.next(<any>{country: 'ca'});
        expect(pipe.transform(34, 'CAD')).toEqual('$34.00');
    });

    it('return a currency symbol after the number when the country is au', () => {
        store$.next(<any>{country: 'au'});
        expect(pipe.transform(34, 'AUD')).toEqual('$34.00');
    });

    it('return a currency symbol after the number when the country is br', () => {
        store$.next(<any>{country: 'br'});
        expect(pipe.transform(34, 'BRL')).toEqual('R$34,00');
    });

    it('return a currency symbol after the number when the country is in', () => {
        store$.next(<any>{country: 'in'});
        expect(pipe.transform(34, 'INR')).toEqual('₹ 34.00');
    });
});
