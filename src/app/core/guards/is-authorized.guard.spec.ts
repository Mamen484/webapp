import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { SflAuthService, SflUserService } from 'sfl-shared/services';
import { IsAuthorizedGuard } from './is-authorized.guard';
import { aggregatedUserInfoMock } from '../../../mocks/agregated-user-info-mock';
import { Store } from '@ngrx/store';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { Router } from '@angular/router';

describe('IsAuthorizedGuard', () => {
    let fetchAggregatedInfoSpy: jasmine.Spy;
    let store;
    let router: jasmine.SpyObj<Router>;
    let guard: IsAuthorizedGuard;
    let authService: jasmine.SpyObj<SflAuthService>;

    beforeEach(() => {
        fetchAggregatedInfoSpy = jasmine.createSpy('SflUserService.fetchAggregatedInfo');
        store = jasmine.createSpyObj('store', ['select', 'dispatch']);
        router = jasmine.createSpyObj('Router', ['navigate']);
        authService = jasmine.createSpyObj(['isLoggedIn', 'logout']);

        TestBed.configureTestingModule({
            providers: [
                IsAuthorizedGuard,
                {provide: SflUserService, useValue: {fetchAggregatedInfo: fetchAggregatedInfoSpy}},
                {provide: Store, useValue: store},
                {provide: Router, useValue: router},
                {provide: SflAuthService, useValue: authService},
            ]
        });
    });

    beforeEach(() => {
        guard = TestBed.inject(IsAuthorizedGuard);
    });

    it('should return false and redirect to the login page when if there is no authorization in the local storage', () => {
        authService.isLoggedIn.and.returnValue(false);
        expect(guard.canActivate(<any>{})).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login'])
    });

    it('should call SflUserService.fetchAggregatedInfo to check if the authorization is valid', async () => {
        store.select.and.returnValue(of(null));
        authService.isLoggedIn.and.returnValue(true);
        fetchAggregatedInfoSpy.and.returnValue(of(AggregatedUserInfo.create(aggregatedUserInfoMock)));
        await (<Observable<boolean>>guard.canActivate(<any>{queryParams: {}})).toPromise();
        expect(fetchAggregatedInfoSpy).toHaveBeenCalled();
    });

    it('should return false if there is invalid authorization in the local storage', async () => {
        authService.isLoggedIn.and.returnValue(false);
        store.select.and.returnValue(of(null));
        fetchAggregatedInfoSpy.and.returnValue(throwError({status: 401}));
        const canActivate = <Observable<boolean>>guard.canActivate(<any>{});
        expect(canActivate).toEqual(<any>false);
    });

    it('should return true if the authorization is valid ', async () => {
        store.select.and.returnValue(of(null));
        authService.isLoggedIn.and.returnValue(true);
        fetchAggregatedInfoSpy.and.returnValue(of(AggregatedUserInfo.create(aggregatedUserInfoMock)));
        const canActivate = await (<Observable<boolean>>guard.canActivate(<any>{queryParams: {}})).toPromise();
        expect(canActivate).toEqual(true);
    });

    it('should redirect to the homepage if the authorization is invalid ', async () => {
        authService.isLoggedIn.and.returnValue(true);
        store.select.and.returnValue(of(null));
        fetchAggregatedInfoSpy.and.returnValue(throwError({status: 401}));
        const canActivate = await (<Observable<boolean>>guard.canActivate(<any>{})).toPromise();
        expect(canActivate).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });


    it('should redirect to the homepage if the user is not admin and does not have enabled stores', async () => {
        authService.isLoggedIn.and.returnValue(true);
        store.select.and.returnValue(of(null));
        fetchAggregatedInfoSpy.and.returnValue(
            of(AggregatedUserInfo.create({_embedded: {store: [{status: 'deleted'}]}, roles: ['user']})));
        const canActivate = await (<Observable<boolean>>guard.canActivate(<any>{queryParams: {}})).toPromise();
        expect(canActivate).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
});
