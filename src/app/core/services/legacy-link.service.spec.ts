import { TestBed, inject } from '@angular/core/testing';

import { LegacyLinkService } from './legacy-link.service';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from './local-storage.service';

describe('LegacyLinkService', () => {
    let getItemSpy: jasmine.Spy;
    beforeEach(() => {

        getItemSpy = jasmine.createSpy('localStorage.getItem');
        TestBed.configureTestingModule({

            providers: [
                LegacyLinkService,
                {provide: LocalStorageService, useValue: {getItem: getItemSpy}},
                {provide: Store, useValue: {select: () => Observable.of({})}}
            ]
        })
        ;
    });

    it('should be created', inject([LegacyLinkService], (service: LegacyLinkService) => {
        expect(service).toBeTruthy();
    }));

    it('shpuld return a link without a token', inject([LegacyLinkService], (service: LegacyLinkService) => {
        getItemSpy.and.returnValue('');
        expect(service.getLegacyLink('/some/path')).toEqual(environment.APP_URL + '/some/path?');
    }));

    it('shpuld return a link with a token', inject([LegacyLinkService], (service: LegacyLinkService) => {
        getItemSpy.and.returnValue('Bearer xsw');
        expect(service.getLegacyLink('/some/path')).toEqual(environment.APP_URL + '/some/path?token=xsw');
    }));

    it('shpuld return a link with a token and a storeId', inject([LegacyLinkService], (service: LegacyLinkService) => {
        getItemSpy.and.returnValue('Bearer xsw');
        expect(service.getLegacyLink('/some/path', {storeId: 232})).toEqual(environment.APP_URL + '/some/path?storeId=232&token=xsw');
    }));
});
