import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { SflAuthService, SflLocalStorageService, SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { IsAuthorizedGuard } from './is-authorized.guard';
import { Store } from '@ngrx/store';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { Router } from '@angular/router';

describe('IsAuthorizedGuard', () => {
    let sflAuthService: jasmine.SpyObj<SflAuthService>;
    let fetchAggregatedInfoSpy: jasmine.Spy;
    let store;
    let router: jasmine.SpyObj<Router>;
    let guard: IsAuthorizedGuard;

    beforeEach(() => {
        fetchAggregatedInfoSpy = jasmine.createSpy('SflUserService.fetchAggregatedInfo');
        store = jasmine.createSpyObj('store', ['select', 'dispatch']);
        router = jasmine.createSpyObj('Router', ['navigate']);
        sflAuthService = jasmine.createSpyObj('SflAuthService', ['isLoggedIn', 'logout']);

        TestBed.configureTestingModule({
            providers: [
                IsAuthorizedGuard,
                {provide: SflUserService, useValue: {fetchAggregatedInfo: fetchAggregatedInfoSpy}},
                {provide: SflAuthService, useValue: sflAuthService},
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
        sflAuthService.isLoggedIn.and.returnValue(false);
        expect(guard.canActivate(<any>{})).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login'])
    });

    it('should call SflUserService.fetchAggregatedInfo to check if the authorization is valid', async () => {
        store.select.and.returnValue(of(null));
        sflAuthService.isLoggedIn.and.returnValue(true);
        fetchAggregatedInfoSpy.and.returnValue(of(AggregatedUserInfo.create(aggregatedUserInfoMock)));
        await (<Observable<boolean>>guard.canActivate(<any>{queryParams: {}})).toPromise();
        expect(fetchAggregatedInfoSpy).toHaveBeenCalled();
    });

    it('should return false if there is invalid authorization in the local storage', async () => {
        sflAuthService.isLoggedIn.and.returnValue(true);
        store.select.and.returnValue(of(null));
        fetchAggregatedInfoSpy.and.returnValue(throwError({status: 401}));
        const canActivate = await (<Observable<boolean>>guard.canActivate(<any>{})).toPromise();
        expect(canActivate).toEqual(false);
    });

    it('should redirect to the login page if the server returned a client error', async () => {
        sflAuthService.isLoggedIn.and.returnValue(true);
        store.select.and.returnValue(of(null));
        fetchAggregatedInfoSpy.and.returnValue(throwError({status: 401}));
        const canActivate = await (<Observable<boolean>>guard.canActivate(<any>{})).toPromise();
        expect(canActivate).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should redirect to the critical error page if the server returned a server error', async () => {
        sflAuthService.isLoggedIn.and.returnValue(true);
        store.select.and.returnValue(of(null));
        fetchAggregatedInfoSpy.and.returnValue(throwError({status: 502}));
        const canActivate = await (<Observable<boolean>>guard.canActivate(<any>{})).toPromise();
        expect(canActivate).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/critical-error'], {skipLocationChange: true});
    });

    it('should NOT redirect to the critical error page if the server returned an error < 400', async () => {
        sflAuthService.isLoggedIn.and.returnValue(true);
        store.select.and.returnValue(of(null));
        fetchAggregatedInfoSpy.and.returnValue(throwError({status: 300}));
        const canActivate = await (<Observable<boolean>>guard.canActivate(<any>{})).toPromise();
        expect(canActivate).toEqual(false);
        expect(router.navigate).not.toHaveBeenCalled();
    });
});

export const aggregatedUserInfoMock = {
    'token': 'turudum',
    'login': 'admin',
    'email': 'clement@shopping-feed.com',
    'roles': <any>['user'],
    'language': 'it_IT',
    '_links': {'self': {'href': '/v1/me'}},
    '_embedded': <any>{
        'account': {'id': 19958, '_links': {'self': {'href': '/v1/account/19958'}}},
        'store': [{
            'id': 307,
            'name': 'Store 1',
            'country': 'fr',
            'permission': {
                'ads': '*',
                'affiliation': '*',
                'buyline': '*',
                'facturation': '*',
                'marketplaces': '*',
                'multiple': '*',
                'owner': '*',
                'retargeting': '*',
                'shopbots': '*',
                'solomo': '*',
                'statistics': '*',
                'timeline': '*',
                'tools': '*'
            },
            'status': 'active',
            'timeline': {'total': 0},
            '_links': {'self': {'href': '/v1/store/307'}},
            'feed': {
                'url': 'http://www.deli-delo.fr/modules/shoppingfluxexport/flux.php?token=346f8eb654199a35758f50f0bf082b97',
                'source': 'Prestashop'
            },
            '_embedded': {
                'order': {
                    'newCount': 12
                }
            }
        },
            {
                'id': 308,
                'name': 'Store 2',
                'permission': {
                    'university': '*'
                },
                'status': 'deleted',
                '_embedded': {
                    'order': {
                        'newCount': 0
                    }
                },
                'timeline': {'total': 12},
                '_links': {'self': {'href': '/v1/store/307'}},
                'feed': {
                    'url': 'http://www.deli-delo.fr/modules/shoppingfluxexport/flux.php?token=346f8eb654199a35758f50f0bf082b97',
                    'source': 'Prestashop'
                }
            },
            {
                'id': 309,
                'name': 'Store 3',
                'permission': {
                    'solomo': '*',
                    'statistics': '*',
                    'timeline': '*',
                    'tools': '*'
                },
                'status': 'suspended',
                '_embedded': {
                    'order': {
                        'newCount': 0
                    }
                },
                'timeline': {'total': 22},
                '_links': {'self': {'href': '/v1/store/307'}},
                'feed': {
                    'url': 'http://www.deli-delo.fr/modules/shoppingfluxexport/flux.php?token=346f8eb654199a35758f50f0bf082b97',
                    'source': 'Prestashop'
                }
            }
        ]
    }
};

