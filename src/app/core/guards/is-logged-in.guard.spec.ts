import {throwError,  Observable, of } from 'rxjs';
import { TestBed, inject } from '@angular/core/testing';
import { UserService } from '../services/user.service';
import { WindowRefService } from '../services/window-ref.service';
import { LegacyLinkService } from '../services/legacy-link.service';
import { LocalStorageService } from '../services/local-storage.service';
import { IsLoggedInGuard } from './is-logged-in.guard';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';

describe('IsLoggedInGuard', () => {

    let getItemSpy: jasmine.Spy;
    let fetchAggregatedInfoSpy: jasmine.Spy;
    let store: jasmine.SpyObj<Store<AppState>>;

    beforeEach(() => {
        getItemSpy = jasmine.createSpy('localStorage.getItem');
        fetchAggregatedInfoSpy = jasmine.createSpy('UserService.fetchAggregatedInfo');
        store = jasmine.createSpyObj('Store', ['select']);
        store.select.and.returnValue(of(null));

        TestBed.configureTestingModule({
            providers: [
                IsLoggedInGuard,
                {provide: UserService, useValue: {fetchAggregatedInfo: fetchAggregatedInfoSpy}},
                {provide: LegacyLinkService, useValue: {getLegacyLink: () => ''}},
                {
                    provide: WindowRefService, useValue: {
                    nativeWindow: {
                        location: {}
                    }
                }
                },
                {provide: LocalStorageService, useValue: {getItem: getItemSpy}},
                {provide: Store, useValue: store}
            ]
        })
        ;
    });

    it('should return true if there is no authorization in the local storage',
        inject([IsLoggedInGuard], (guard: IsLoggedInGuard) => {
            getItemSpy.and.returnValue(null);
            expect(guard.canActivate(<any>{})).toEqual(true);
        }));

    it('should call UserService.fetchAggregatedInfo to check if the authorization is valid',
        inject([IsLoggedInGuard], (guard: IsLoggedInGuard) => {
            getItemSpy.and.returnValue('some token');
            fetchAggregatedInfoSpy.and.returnValue(of({}));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(fetchAggregatedInfoSpy).toHaveBeenCalled();
            });
        }));

    it('should return true if there is invalid authorization in the local storage',
        inject([IsLoggedInGuard], (guard: IsLoggedInGuard) => {
            getItemSpy.and.returnValue('some token');
            fetchAggregatedInfoSpy.and.returnValue(throwError(401));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(canActivate).toEqual(true);
            });
        }));

    it('should return false if the authorization is valid ',
        inject([IsLoggedInGuard], (guard: IsLoggedInGuard) => {
            getItemSpy.and.returnValue('some token');
            fetchAggregatedInfoSpy.and.returnValue(of({}));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(canActivate).toEqual(false);
            });
        }));

    it('should redirect to the homepage if the authorization is valid ',
        inject([IsLoggedInGuard, WindowRefService], (guard: IsLoggedInGuard, windowRef: WindowRefService) => {
            getItemSpy.and.returnValue('some token');
            fetchAggregatedInfoSpy.and.returnValue(of({}));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(windowRef.nativeWindow.location.href).toBeDefined();
            });
        }));
})
;
