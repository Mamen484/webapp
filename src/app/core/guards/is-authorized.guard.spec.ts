import { TestBed, inject } from '@angular/core/testing';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import { WindowRefService } from '../services/window-ref.service';
import { LocalStorageService } from '../services/local-storage.service';
import { IsAuthorizedGuard } from './is-authorized.guard';
import { aggregatedUserInfoMock } from '../../../mocks/agregated-user-info-mock';
import { Store } from '@ngrx/store';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';

describe('IsAuthorizedGuard', () => {

    let getItemSpy: jasmine.Spy;
    let removeItemSpy: jasmine.Spy;
    let fetchAggregatedInfoSpy: jasmine.Spy;
    let store;

    beforeEach(() => {
        getItemSpy = jasmine.createSpy('localStorage.getItem');
        removeItemSpy = jasmine.createSpy('localStorage.removeItem');
        fetchAggregatedInfoSpy = jasmine.createSpy('UserService.fetchAggregatedInfo');
        store = jasmine.createSpyObj('store', ['select']);

        TestBed.configureTestingModule({
            providers: [
                IsAuthorizedGuard,
                {provide: UserService, useValue: {fetchAggregatedInfo: fetchAggregatedInfoSpy}},
                {provide: WindowRefService, useValue: {nativeWindow: {location: {}}}},
                {provide: LocalStorageService, useValue: {getItem: getItemSpy, removeItem: removeItemSpy}},
                {provide: Store, useValue: store},
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
            store.select.and.returnValues(
                Observable.of(null),
                {dispatch: jasmine.createSpy('dispatch')}
            );
            getItemSpy.and.returnValue('some token');
            fetchAggregatedInfoSpy.and.returnValue(Observable.of(AggregatedUserInfo.create(aggregatedUserInfoMock)));
            (<Observable<boolean>>guard.canActivate(<any>{queryParams: {}})).subscribe(canActivate => {
                expect(fetchAggregatedInfoSpy).toHaveBeenCalled();
            });
        }));

    it('should return false if there is invalid authorization in the local storage',
        inject([IsAuthorizedGuard], (guard: IsAuthorizedGuard) => {
            getItemSpy.and.returnValue('some token');
            store.select.and.returnValue( Observable.of(null));
            fetchAggregatedInfoSpy.and.returnValue(Observable.throw(401));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(canActivate).toEqual(false);
            });
        }));

    it('should return true if the authorization is valid ',
        inject([IsAuthorizedGuard], (guard: IsAuthorizedGuard) => {
            store.select.and.returnValues(Observable.of(null), {dispatch: jasmine.createSpy('dispatch')});
            getItemSpy.and.returnValue('some token');
            fetchAggregatedInfoSpy.and.returnValue(Observable.of(AggregatedUserInfo.create(aggregatedUserInfoMock)));
            (<Observable<boolean>>guard.canActivate(<any>{queryParams: {}})).subscribe(canActivate => {
                expect(canActivate).toEqual(true);
            });
        }));

    it('should redirect to the homepage if the authorization is invalid ',
        inject([IsAuthorizedGuard, WindowRefService], (guard: IsAuthorizedGuard, windowRef: WindowRefService) => {
            getItemSpy.and.returnValue('some token');
            store.select.and.returnValue( Observable.of(null));
            fetchAggregatedInfoSpy.and.returnValue(Observable.throw(401));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(windowRef.nativeWindow.location.href).toEqual('/v3/en/login');
            });
        }));


    it('should write the userData to the app store, if the user has an enabled store',
        inject([IsAuthorizedGuard], (guard: IsAuthorizedGuard) => {
            let dispatchSpy = jasmine.createSpy('dispatch');
            store.select.and.returnValues(
                Observable.of(AggregatedUserInfo.create({
                    roles: ['user'],
                    _embedded: {store: [{name: 'some name', status: 'active'}]}

                })),
                {dispatch: dispatchSpy}
            );
            getItemSpy.and.returnValue('some token');
            (<Observable<boolean>>guard.canActivate(<any>{queryParams: {}})).subscribe(canActivate => {
                expect(store.select).toHaveBeenCalledWith('userInfo');
                expect(dispatchSpy.calls.mostRecent().args[0].type).toEqual('INITIALIZE');
            });
        }));

    it('should write the userData to the app store, if the user has an "admin" role',
        inject([IsAuthorizedGuard], (guard: IsAuthorizedGuard) => {
            let dispatchSpy = jasmine.createSpy('dispatch');
            store.select.and.returnValues(
                Observable.of(null),
                {dispatch: dispatchSpy}
            );
            getItemSpy.and.returnValue('some token');
            fetchAggregatedInfoSpy.and.returnValue(Observable.of(AggregatedUserInfo.create({
                roles: ['admin'],
                _embedded: {store: []}

            })));
            (<Observable<boolean>>guard.canActivate(<any>{queryParams: {}})).subscribe(canActivate => {
                expect(store.select).toHaveBeenCalledWith('userInfo');
                expect(dispatchSpy.calls.mostRecent().args[0].type).toEqual('INITIALIZE');
            });
        }));
});
