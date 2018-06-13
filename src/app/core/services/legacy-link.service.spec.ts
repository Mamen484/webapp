import { inject, TestBed } from '@angular/core/testing';

import { LegacyLinkService } from './legacy-link.service';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { LocalStorageService } from './local-storage.service';
import { AppState } from '../entities/app-state';
import { Subject } from 'rxjs/Rx';
import { Store as CurrentStore } from '../entities/store';

describe('LegacyLinkService', () => {
    let getItemSpy: jasmine.Spy;
    let store: jasmine.SpyObj<Store<AppState>>;
    let currentStore$: Subject<CurrentStore>;
    beforeEach(() => {

        getItemSpy = jasmine.createSpy('localStorage.getItem');
        store = jasmine.createSpyObj(['select']);
        currentStore$ = new Subject();

        TestBed.configureTestingModule({
            providers: [
                LegacyLinkService,
                {provide: LocalStorageService, useValue: {getItem: getItemSpy}},
                {provide: Store, useValue: store}
            ]
        });
        store.select.and.returnValue(currentStore$.asObservable());
    });

    it('should be created', inject([LegacyLinkService], (service: LegacyLinkService) => {
        expect(service).toBeTruthy();
    }));

    it('should return a link without a token', inject([LegacyLinkService], (service: LegacyLinkService) => {
        getItemSpy.and.returnValue('');
        expect(service.getLegacyLink('/some/path')).toEqual(environment.APP_URL + '/some/path?');
    }));

    it('should return a link with a token', inject([LegacyLinkService], (service: LegacyLinkService) => {
        getItemSpy.and.returnValue('Bearer xsw');
        expect(service.getLegacyLink('/some/path')).toEqual(environment.APP_URL + '/some/path?token=xsw');
    }));

    it('should return a link with a token and a storeId', inject([LegacyLinkService], (service: LegacyLinkService) => {
        getItemSpy.and.returnValue('Bearer xsw');
        expect(service.getLegacyLink('/some/path', {storeId: 114})).toEqual(environment.APP_URL + '/some/path?storeId=114&token=xsw');
    }));

    it('should return a link with a token and a store id from current store', inject([LegacyLinkService], (service: LegacyLinkService) => {
        getItemSpy.and.returnValue('Bearer xsw');
        currentStore$.next(<any>{id: 119});
        expect(service.getLegacyLink('/some/path')).toEqual(environment.APP_URL + '/some/path?token=xsw&store=119');
    }));

    it('should return a link with a token and a custom store id', inject([LegacyLinkService], (service: LegacyLinkService) => {
        getItemSpy.and.returnValue('Bearer xsw');
        currentStore$.next(<any>{id: 119});
        expect(service.getLegacyLink('/some/path', {store: 232})).toEqual(environment.APP_URL + '/some/path?store=232&token=xsw');
    }));
});
