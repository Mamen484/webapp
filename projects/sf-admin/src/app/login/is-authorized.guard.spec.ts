import { Observable, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { SflLocalStorageService, SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { IsAuthorizedGuard } from './is-authorized.guard';
import { Store } from '@ngrx/store';
import { AggregatedUserInfo } from 'sfl-shared/entities';
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

    it('should return false if the authorization is valid but the user is not admin', async () => {
        store.select.and.returnValue(of(null));
        getItemSpy.and.returnValue('some token');
        fetchAggregatedInfoSpy.and.returnValue(of(AggregatedUserInfo.create(aggregatedUserInfoMock)));
        const canActivate = await (<Observable<boolean>>guard.canActivate(<any>{queryParams: {}})).toPromise();
        expect(canActivate).toEqual(false);
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

