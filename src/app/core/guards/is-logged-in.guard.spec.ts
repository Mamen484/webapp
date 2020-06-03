import { Observable, of, throwError } from 'rxjs';
import { inject, TestBed } from '@angular/core/testing';
import { SflAuthService, SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { LegacyLinkService } from '../services/legacy-link.service';
import { IsLoggedInGuard } from './is-logged-in.guard';

describe('IsLoggedInGuard', () => {

    let fetchAggregatedInfoSpy: jasmine.Spy;
    let authService: jasmine.SpyObj<SflAuthService>;

    beforeEach(() => {
        fetchAggregatedInfoSpy = jasmine.createSpy('SflUserService.fetchAggregatedInfo');
        authService = jasmine.createSpyObj(['isLoggedIn']);

        TestBed.configureTestingModule({
            providers: [
                IsLoggedInGuard,
                {provide: SflUserService, useValue: {fetchAggregatedInfo: fetchAggregatedInfoSpy}},
                {provide: LegacyLinkService, useValue: {getLegacyLink: () => ''}},
                {
                    provide: SflWindowRefService, useValue: {
                        nativeWindow: {
                            location: {}
                        }
                    }
                },
                {provide: SflAuthService, useValue: authService},
            ]
        })
        ;
    });

    it('should return true if there is no authorization in the local storage',
        inject([IsLoggedInGuard], (guard: IsLoggedInGuard) => {
            authService.isLoggedIn.and.returnValue(false);
            expect(guard.canActivate(<any>{})).toEqual(true);
        }));

    it('should call SflUserService.fetchAggregatedInfo to check if the authorization is valid',
        inject([IsLoggedInGuard], (guard: IsLoggedInGuard) => {
            authService.isLoggedIn.and.returnValue(true);
            fetchAggregatedInfoSpy.and.returnValue(of({}));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(fetchAggregatedInfoSpy).toHaveBeenCalled();
            });
        }));

    it('should return true if there is invalid authorization in the local storage',
        inject([IsLoggedInGuard], (guard: IsLoggedInGuard) => {
            authService.isLoggedIn.and.returnValue(true);
            fetchAggregatedInfoSpy.and.returnValue(throwError(401));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(canActivate).toEqual(true);
            });
        }));

    it('should return false if the authorization is valid ',
        inject([IsLoggedInGuard], (guard: IsLoggedInGuard) => {
            authService.isLoggedIn.and.returnValue(true);
            fetchAggregatedInfoSpy.and.returnValue(of({}));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(canActivate).toEqual(false);
            });
        }));

    it('should redirect to the homepage if the authorization is valid ',
        inject([IsLoggedInGuard, SflWindowRefService], (guard: IsLoggedInGuard, windowRef: SflWindowRefService) => {
            authService.isLoggedIn.and.returnValue(true);
            fetchAggregatedInfoSpy.and.returnValue(of({}));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(windowRef.nativeWindow.location.href).toBeDefined();
            });
        }));
})
;
