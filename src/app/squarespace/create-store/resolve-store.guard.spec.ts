import { inject, TestBed } from '@angular/core/testing';

import { ResolveStoreGuard } from './resolve-store.guard';
import { SflAuthService } from 'sfl-shared/services';
import { SquarespaceService } from '../squarespace.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('ResolveStoreGuard', () => {
    let authService: jasmine.SpyObj<SflAuthService>;
    let squarespaceService: jasmine.SpyObj<SquarespaceService>;
    let router: jasmine.SpyObj<Router>;

    beforeEach(() => {
        authService = jasmine.createSpyObj('SflAuthService', ['loginByToken']);
        squarespaceService = jasmine.createSpyObj('SquarespaceService', ['getStore']);
        router = jasmine.createSpyObj('Router', ['navigate']);
        TestBed.configureTestingModule({
            providers: [
                ResolveStoreGuard,
                {provide: SflAuthService, useValue: authService},
                {provide: SquarespaceService, useValue: squarespaceService},
                {provide: Router, useValue: router},
            ]
        });
    });

    it('should return a store object if the storeId is empty', inject([ResolveStoreGuard], (guard: ResolveStoreGuard) => {
        squarespaceService.getStore.and.returnValue(of(<any>{storeId: null}));
        let store;
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe(data => store = data);
        expect(store).toEqual({storeId: null});
    }));

    it('should NOT authenticate a user if the storeId is empty', inject([ResolveStoreGuard], (guard: ResolveStoreGuard) => {
        squarespaceService.getStore.and.returnValue(of(<any>{storeId: null}));
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe();
        expect(authService.loginByToken).not.toHaveBeenCalled();
    }));

    it('should NOT redirect a user to a homepage a user if the storeId is empty', inject([ResolveStoreGuard], (guard: ResolveStoreGuard) => {
        squarespaceService.getStore.and.returnValue(of(<any>{storeId: null}));
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe();
        expect(router.navigate).not.toHaveBeenCalled();
    }));

    it('should NOT return a store object if the storeId is specified', inject([ResolveStoreGuard], (guard: ResolveStoreGuard) => {
        squarespaceService.getStore.and.returnValue(of(<any>{storeId: 125}));
        let store;
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe(data => store = data);
        expect(store).not.toBeDefined();
    }));

    it('should authenticate a user if the storeId is specified', inject([ResolveStoreGuard], (guard: ResolveStoreGuard) => {
        squarespaceService.getStore.and.returnValue(of(<any>{storeId: 125}));
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe();
        expect(authService.loginByToken).toHaveBeenCalled();
    }));

    it('should redirect a user to a homepage a user if the storeId is specified', inject([ResolveStoreGuard], (guard: ResolveStoreGuard) => {
        squarespaceService.getStore.and.returnValue(of(<any>{storeId: 125}));
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe();
        expect(router.navigate).toHaveBeenCalled();
    }));

    it('should redirect to the squarespace error page if the store fetching failed', inject([ResolveStoreGuard], (guard: ResolveStoreGuard) => {
        squarespaceService.getStore.and.returnValue(throwError({}));
        guard.resolve(<any>{queryParamMap: new Map().set('code', 'someCode')}).subscribe();

        expect(router.navigate).toHaveBeenCalledWith(['squarespace', 'error']);
    }));

});
