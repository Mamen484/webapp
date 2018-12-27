import { TestBed } from '@angular/core/testing';

import { SflLegacyLinkService } from './legacy-link.service';
import { SFL_LEGACY_LINK } from 'sfl-shared/entities';
import { SflAuthService } from './auth.service';

describe('SflLegacyLinkService', () => {
    let authService: jasmine.SpyObj<SflAuthService>;
    let service: SflLegacyLinkService;
    beforeEach(() => {
        authService = jasmine.createSpyObj('SflAuthService', ['getAuthToken']);
        TestBed.configureTestingModule({
            providers: [
                SflLegacyLinkService,
                {provide: SflAuthService, useValue: authService},
                {provide: SFL_LEGACY_LINK, useValue: 'legacyLink'},
            ]
        });
        service = TestBed.get(SflLegacyLinkService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a link without a token', () => {
        authService.getAuthToken.and.returnValue('');
        expect(service.getLegacyLink('/some/path', {})).toEqual('legacyLink/some/path');
    });

    it('should return a link with a token', () => {
        authService.getAuthToken.and.returnValue('xsw');
        expect(service.getLegacyLink('/some/path', {})).toEqual('legacyLink/some/path?token=xsw');
    });

    it('should return a link with a token and a storeId', () => {
        authService.getAuthToken.and.returnValue('xsw');
        expect(service.getLegacyLink('/some/path', {storeId: 114})).toEqual('legacyLink/some/path?storeId=114&token=xsw');
    });


    it('should return a link WITHOUT a token when addAuthorization param is falsy', () => {
        authService.getAuthToken.and.returnValue('xsw');
        expect(service.getLegacyLink('/some/path', {}, false)).toEqual('legacyLink/some/path');
    });
});
