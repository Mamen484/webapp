import { TestBed, inject } from '@angular/core/testing';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import { WindowRefService } from '../services/window-ref.service';
import { LocalStorageService } from '../services/local-storage.service';
import { IsAuthorizedGuard } from './is-authorized.guard';

describe('IsAuthorizedGuard', () => {

    let getItemSpy: jasmine.Spy;
    let fetchAggregatedInfoSpy: jasmine.Spy;

    beforeEach(() => {
        getItemSpy = jasmine.createSpy('localStorage.getItem');
        fetchAggregatedInfoSpy = jasmine.createSpy('UserService.fetchAggregatedInfo');

        TestBed.configureTestingModule({
            providers: [
                IsAuthorizedGuard,
                {provide: UserService, useValue: {fetchAggregatedInfo: fetchAggregatedInfoSpy}},
                {provide: WindowRefService, useValue: {nativeWindow: {location: {}}}},
                {provide: LocalStorageService, useValue: {getItem: getItemSpy}}
            ]
        })
        ;
    });

    it('should return false and redirect to the login page when if there is no authorization in the local storage',
        inject([IsAuthorizedGuard, WindowRefService], (guard: IsAuthorizedGuard, windowRef: WindowRefService) => {
            getItemSpy.and.returnValue(null);
            expect(guard.canActivate(<any>{})).toEqual(false);
            expect(windowRef.nativeWindow.location.href).toEqual('/v3/en/login');
        }));

    it('should call UserService.fetchAggregatedInfo to check if the authorization is valid',
        inject([IsAuthorizedGuard], (guard: IsAuthorizedGuard) => {
            getItemSpy.and.returnValue('some token');
            fetchAggregatedInfoSpy.and.returnValue(Observable.of({}));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(fetchAggregatedInfoSpy).toHaveBeenCalled();
            });
        }));

    it('should return false if there is invalid authorization in the local storage',
        inject([IsAuthorizedGuard], (guard: IsAuthorizedGuard) => {
            getItemSpy.and.returnValue('some token');
            fetchAggregatedInfoSpy.and.returnValue(Observable.throw(401));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(canActivate).toEqual(false);
            });
        }));

    it('should return true if the authorization is valid ',
        inject([IsAuthorizedGuard], (guard: IsAuthorizedGuard) => {
            getItemSpy.and.returnValue('some token');
            fetchAggregatedInfoSpy.and.returnValue(Observable.of({}));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(canActivate).toEqual(true);
            });
        }));

    it('should redirect to the homepage if the authorization is invalid ',
        inject([IsAuthorizedGuard, WindowRefService], (guard: IsAuthorizedGuard, windowRef: WindowRefService) => {
            getItemSpy.and.returnValue('some token');
            fetchAggregatedInfoSpy.and.returnValue(Observable.throw(401));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(windowRef.nativeWindow.location.href).toEqual('/v3/en/login');
            });
        }));
})
;
