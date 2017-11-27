import { TestBed, inject, async, tick } from '@angular/core/testing';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from '../services/local-storage.service';
import { IsAuthorizedGuard } from './is-authorized.guard';
import { aggregatedUserInfoMock } from '../../../mocks/agregated-user-info-mock';
import { Store } from '@ngrx/store';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { Router } from '@angular/router';

describe('IsAuthorizedGuard', () => {

    let getItemSpy: jasmine.Spy;
    let removeItemSpy: jasmine.Spy;
    let fetchAggregatedInfoSpy: jasmine.Spy;
    let store;
    let router;

    beforeEach(() => {
        getItemSpy = jasmine.createSpy('localStorage.getItem');
        removeItemSpy = jasmine.createSpy('localStorage.removeItem');
        fetchAggregatedInfoSpy = jasmine.createSpy('UserService.fetchAggregatedInfo');
        store = jasmine.createSpyObj('store', ['select']);
        router = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                IsAuthorizedGuard,
                {provide: UserService, useValue: {fetchAggregatedInfo: fetchAggregatedInfoSpy}},
                {provide: LocalStorageService, useValue: {getItem: getItemSpy, removeItem: removeItemSpy}},
                {provide: Store, useValue: store},
                {provide: Router, useValue: router},

            ],
        })
        ;
    });

    it('should return false and redirect to the login page when if there is no authorization in the local storage',
        inject([IsAuthorizedGuard], (guard: IsAuthorizedGuard) => {
            getItemSpy.and.returnValue(null);
            expect(guard.canActivate(<any>{})).toEqual(false);
            expect(router.navigate).toHaveBeenCalledWith(['/login'])
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
            store.select.and.returnValue(Observable.of(null));
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
        inject([IsAuthorizedGuard], (guard: IsAuthorizedGuard) => {
            getItemSpy.and.returnValue('some token');
            store.select.and.returnValue(Observable.of(null));
            fetchAggregatedInfoSpy.and.returnValue(Observable.throw(401));
            (<Observable<boolean>>guard.canActivate(<any>{})).subscribe(canActivate => {
                expect(canActivate).toEqual(false);
                expect(router.navigate).toHaveBeenCalledWith(['/login']);
            });
        }));

    it('should redirect to the homepage if the user is not admin and does not have enabled stores',
        inject([IsAuthorizedGuard], (guard: IsAuthorizedGuard) => {
            getItemSpy.and.returnValue('some token');
            store.select.and.returnValue(Observable.of(null));
            fetchAggregatedInfoSpy.and.returnValue(
                Observable.of(AggregatedUserInfo.create({_embedded: {store: [{status: 'deleted'}]}, roles: ['user']})));
            (<Observable<boolean>>guard.canActivate(<any>{queryParams: {}})).subscribe(canActivate => {
                expect(canActivate).toEqual(false);
                expect(router.navigate).toHaveBeenCalledWith(['/login']);
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
                expect(dispatchSpy.calls.mostRecent().args[0].type).toEqual('INITIALIZE_USER_INFO');
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
                expect(dispatchSpy.calls.mostRecent().args[0].type).toEqual('INITIALIZE_USER_INFO');
            });
        }));
});
