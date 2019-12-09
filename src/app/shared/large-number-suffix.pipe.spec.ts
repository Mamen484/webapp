import {LargeNumberSuffixPipe} from './large-number-suffix.pipe';
import {Store} from '@ngrx/store';
import {AppState} from '../core/entities/app-state';
import {of} from 'rxjs';
import {SflLocaleIdService} from 'sfl-shared/services';

describe('LargeNumberSuffixPipe', () => {

    describe('number shortening', () => {
        let pipe;
        let appStore: jasmine.SpyObj<Store<AppState>>;
        let localeIdService: SflLocaleIdService;

        beforeEach(() => {
            appStore = jasmine.createSpyObj('Store', ['select']);
            appStore.select.and.returnValue(of({country: 'fr'}));
            localeIdService = <any>{localeId: 'fr'};
            pipe = new LargeNumberSuffixPipe(appStore, localeIdService);
        });

        it('create an instance', () => {
            expect(pipe).toBeTruthy();
        });

        it('transform 1 to just 1', () => {
            expect(pipe.transform(1)).toEqual('1');
        });

        it('transform 1000 to 1K', () => {
            expect(pipe.transform(1000)).toEqual('1K');
        });

        it('transform 1000000 to 1M', () => {
            expect(pipe.transform(1000000)).toEqual('1M');
        });


        it('transform 244.24423312 to 244.24', () => {
            expect(pipe.transform(244.24423312)).toEqual('244,24');
        });

        it('transform 244.2 to 244.2', () => {
            expect(pipe.transform(244.2)).toEqual('244,2');
        });

        it('transform 244.2 to an object', () => {
            expect(pipe.transform(244.2, true)).toEqual({number: 244.2, suffix: ''});
        });

        it('transform 2444.2 to 2.44K', () => {
            expect(pipe.transform(2444.2)).toEqual('2,44K');
        });

        it('transform 2444.2 to an object', () => {
            expect(pipe.transform(2444.2, true)).toEqual({number: 2.4442, suffix: 'K'});
        });

        it('transform 2400 to 2.4K', () => {
            expect(pipe.transform(2400)).toEqual('2,4K');
        });

        it('transform 2400000 to 2.4M', () => {
            expect(pipe.transform(2400000)).toEqual('2,4M');
        });

        it('transform 2400000 to an object', () => {
            expect(pipe.transform(2400000, true)).toEqual({number: 2.4, suffix: 'M'});
        });

        it('transform 24414141 to 24.41M', () => {
            expect(pipe.transform(24414141)).toEqual('24,41M');
        });
    });

    describe('localization', () => {
        it('should use a dot as a fraction separator if the locale is en', () => {
            const pipe = new LargeNumberSuffixPipe(<any>{select: () => of({country: 'en'})}, <any>{localeId: 'fr'});
            expect(pipe.transform(24414141.68)).toBe('24.41M');
        });

        it('should use a comma as a fraction separator if the locale is fr', () => {
            const pipe = new LargeNumberSuffixPipe(<any>{select: () => of({country: 'fr'})}, <any>{localeId: 'fr'});
            expect(pipe.transform(24414141.68)).toBe('24,41M');
        });
    });

});
