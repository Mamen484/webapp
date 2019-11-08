import { TestBed } from '@angular/core/testing';

import { ResolveStoreGuard } from './resolve-store.guard';
import { SflAuthService } from 'sfl-shared/services';
import { SquarespaceService } from '../squarespace.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('ResolveStoreGuard', () => {
    let authService: jasmine.SpyObj<SflAuthService>;
    let squarespaceService: jasmine.SpyObj<SquarespaceService>;
    let router: jasmine.SpyObj<Router>;
    let guard: ResolveStoreGuard;

    beforeEach(() => {
        authService = jasmine.createSpyObj('SflAuthService', ['loginByToken']);
        squarespaceService = jasmine.createSpyObj('SquarespaceService', ['getStore', 'patchStore']);
        router = jasmine.createSpyObj('Router', ['navigate']);
        TestBed.configureTestingModule({
            providers: [
                ResolveStoreGuard,
                {provide: SflAuthService, useValue: authService},
                {provide: SquarespaceService, useValue: squarespaceService},
                {provide: Router, useValue: router},
            ]
        });
        guard = TestBed.get(ResolveStoreGuard);
    });

    it('should return a store object if the storeId is empty', () => {
        squarespaceService.getStore.and.returnValue(of(<any>{storeId: null}));
        let store;
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe(data => store = data);
        expect(store).toEqual({storeId: null});
    });

    it('should NOT authenticate a user if the storeId is empty', () => {
        squarespaceService.getStore.and.returnValue(of(<any>{storeId: null}));
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe();
        expect(authService.loginByToken).not.toHaveBeenCalled();
    });

    it('should NOT redirect a user to a homepage a user if the storeId is empty', () => {
        squarespaceService.getStore.and.returnValue(of(<any>{storeId: null}));
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe();
        expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should NOT return a store object if the storeId is specified', () => {
        squarespaceService.getStore.and.returnValue(of(<any>{storeId: 125}));
        squarespaceService.patchStore.and.returnValue(of({}));
        let store;
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe(data => store = data);
        expect(store).not.toBeDefined();
    });

    it('should authenticate a user if the storeId is specified', () => {
        squarespaceService.getStore.and.returnValue(of(<any>{storeId: 125}));
        squarespaceService.patchStore.and.returnValue(of({}));
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe();
        expect(authService.loginByToken).toHaveBeenCalled();
    });

    it('should redirect a user to a homepage a user if the storeId is specified', () => {
        squarespaceService.getStore.and.returnValue(of(<any>{storeId: 125}));
        squarespaceService.patchStore.and.returnValue(of({}));
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe();
        expect(router.navigate).toHaveBeenCalled();
    });

    it('should patch the store if storeId is specified', () => {
        squarespaceService.getStore.and.returnValue(of(<any>{
            storeId: 125,
            accessToken: 'access token 1902',
            refreshToken: 'refresh token 1103',
            tokenExpiresAt: 4578198273518,
        }));
        squarespaceService.patchStore.and.returnValue(of({}));
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe();
        expect(squarespaceService.patchStore).toHaveBeenCalledWith({
            storeId: 125,
            accessToken: 'access token 1902',
            refreshToken: 'refresh token 1103',
            tokenExpiresAt: 4578198273518,
        });
    });

    it('should redirect to the squarespace error page if the store fetching failed', () => {
        squarespaceService.getStore.and.returnValue(throwError({}));
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe();

        expect(router.navigate).toHaveBeenCalledWith(['squarespace', 'error']);
    });

    it('should redirect to the squarespace error page if the store patching failed', () => {
        squarespaceService.getStore.and.returnValue(of(<any>{storeId: 125}));
        squarespaceService.patchStore.and.returnValue(throwError({}));
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe();
        expect(router.navigate).toHaveBeenCalledWith(['squarespace', 'error']);
        expect(router.navigate).toHaveBeenCalledTimes(1);
    });

    it('should not log the user in if store patching failed', () => {
        squarespaceService.getStore.and.returnValue(of(<any>{storeId: 125}));
        squarespaceService.patchStore.and.returnValue(throwError({}));
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe();
        expect(authService.loginByToken).not.toHaveBeenCalled();
    });

});
