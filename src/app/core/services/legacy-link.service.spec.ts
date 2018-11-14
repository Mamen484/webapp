import { TestBed } from '@angular/core/testing';

import { LegacyLinkService } from './legacy-link.service';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { SflAuthService } from 'sfl-shared/services';
import { AppState } from '../entities/app-state';
import { Subject } from 'rxjs/Rx';
import { Store as CurrentStore } from 'sfl-shared/entities';

describe('LegacyLinkService', () => {
    let store: jasmine.SpyObj<Store<AppState>>;
    let currentStore$: Subject<CurrentStore>;
    let authService: jasmine.SpyObj<SflAuthService>;
    let service: LegacyLinkService;
    beforeEach(() => {
        store = jasmine.createSpyObj(['select']);
        currentStore$ = new Subject();
        authService = jasmine.createSpyObj('SflAuthService', ['getAuthToken']);

        TestBed.configureTestingModule({
            providers: [
                LegacyLinkService,
                {provide: SflAuthService, useValue: authService},
                {provide: Store, useValue: store}
            ]
        });
        store.select.and.returnValue(currentStore$.asObservable());
        service = TestBed.get(LegacyLinkService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a link without a token', () => {
        authService.getAuthToken.and.returnValue('');
        expect(service.getLegacyLink('/some/path')).toEqual(environment.APP_URL + '/some/path');
    });

    it('should return a link with a token', () => {
        authService.getAuthToken.and.returnValue('xsw');
        expect(service.getLegacyLink('/some/path')).toEqual(environment.APP_URL + '/some/path?token=xsw');
    });

    it('should return a link with a token and a storeId', () => {
        authService.getAuthToken.and.returnValue('xsw');
        expect(service.getLegacyLink('/some/path', {storeId: 114})).toEqual(environment.APP_URL + '/some/path?storeId=114&token=xsw');
    });

    it('should return a link with a token and a store id from current store', () => {
        authService.getAuthToken.and.returnValue('xsw');
        currentStore$.next(<any>{id: 119});
        expect(service.getLegacyLink('/some/path')).toEqual(environment.APP_URL + '/some/path?store=119&token=xsw');
    });

    it('should return a link with a token and a custom store id', () => {
        authService.getAuthToken.and.returnValue('xsw');
        currentStore$.next(<any>{id: 119});
        expect(service.getLegacyLink('/some/path', {store: 232})).toEqual(environment.APP_URL + '/some/path?store=232&token=xsw');
    });

    it('should return a link WITHOUT a token and a store id from current store when addAuthorization param is falsy',
        () => {
            authService.getAuthToken.and.returnValue('xsw');
            currentStore$.next(<any>{id: 119});
            expect(service.getLegacyLink('/some/path', {}, false)).toEqual(environment.APP_URL + '/some/path');
        });
});
