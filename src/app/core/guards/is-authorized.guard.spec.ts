import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { SflUserService } from 'sfl-shared';
import { SflWindowRefService } from 'sfl-shared';
import { SflLocalStorageService } from 'sfl-shared';
import { IsAuthorizedGuard } from './is-authorized.guard';
import { aggregatedUserInfoMock } from '../../../mocks/agregated-user-info-mock';
import { Store } from '@ngrx/store';
import { AggregatedUserInfo } from 'sfl-shared/src/lib/core/entities';
import { Router } from '@angular/router';

describe('IsAuthorizedGuard', () => {

    let getItemSpy: jasmine.Spy;
    let removeItemSpy: jasmine.Spy;
    let fetchAggregatedInfoSpy: jasmine.Spy;
    let store;
    let router: jasmine.SpyObj<Router>;
    let guard: IsAuthorizedGuard;

    beforeEach(() => {
        getItemSpy = jasmine.createSpy('localStorage.getItem');
        removeItemSpy = jasmine.createSpy('localStorage.removeItem');
        fetchAggregatedInfoSpy = jasmine.createSpy('SflUserService.fetchAggregatedInfo');
        store = jasmine.createSpyObj('store', ['select', 'dispatch']);
        router = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                IsAuthorizedGuard,
                {provide: SflUserService, useValue: {fetchAggregatedInfo: fetchAggregatedInfoSpy}},
                {provide: SflLocalStorageService, useValue: {getItem: getItemSpy, removeItem: removeItemSpy}},
                {provide: Store, useValue: store},
                {provide: Router, useValue: router},
                {provide: SflWindowRefService, useValue: {nativeWindow: {location: {}}}},
            ]
        });
    });

    beforeEach(() => {
        guard = TestBed.get(IsAuthorizedGuard);
    });

    it('should return false and redirect to the login page when if there is no authorization in the local storage', () => {
        getItemSpy.and.returnValue(null);
        expect(guard.canActivate(<any>{})).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login'])
    });

    it('should call SflUserService.fetchAggregatedInfo to check if the authorization is valid', async () => {
        store.select.and.returnValue(of(null));
        getItemSpy.and.returnValue('some token');
        fetchAggregatedInfoSpy.and.returnValue(of(AggregatedUserInfo.create(aggregatedUserInfoMock)));
        await (<Observable<boolean>>guard.canActivate(<any>{queryParams: {}})).toPromise();
        expect(fetchAggregatedInfoSpy).toHaveBeenCalled();
    });

    it('should return false if there is invalid authorization in the local storage', async () => {
        getItemSpy.and.returnValue('some token');
        store.select.and.returnValue(of(null));
        fetchAggregatedInfoSpy.and.returnValue(throwError({status: 401}));
        const canActivate = await (<Observable<boolean>>guard.canActivate(<any>{})).toPromise();
        expect(canActivate).toEqual(false);
    });

    it('should return true if the authorization is valid ', async () => {
        store.select.and.returnValue(of(null));
        getItemSpy.and.returnValue('some token');
        fetchAggregatedInfoSpy.and.returnValue(of(AggregatedUserInfo.create(aggregatedUserInfoMock)));
        const canActivate = await (<Observable<boolean>>guard.canActivate(<any>{queryParams: {}})).toPromise();
        expect(canActivate).toEqual(true);
    });

    it('should redirect to the homepage if the authorization is invalid ', async () => {
        getItemSpy.and.returnValue('some token');
        store.select.and.returnValue(of(null));
        fetchAggregatedInfoSpy.and.returnValue(throwError({status: 401}));
        const canActivate = await (<Observable<boolean>>guard.canActivate(<any>{})).toPromise();
        expect(canActivate).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });


    it('should redirect to the homepage if the user is not admin and does not have enabled stores', async () => {
        getItemSpy.and.returnValue('some token');
        store.select.and.returnValue(of(null));
        fetchAggregatedInfoSpy.and.returnValue(
            of(AggregatedUserInfo.create({_embedded: {store: [{status: 'deleted'}]}, roles: ['user']})));
        const canActivate = await (<Observable<boolean>>guard.canActivate(<any>{queryParams: {}})).toPromise();
        expect(canActivate).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
});
