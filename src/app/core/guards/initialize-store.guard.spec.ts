import { throwError, of } from 'rxjs';
import { TestBed, inject } from '@angular/core/testing';

import { InitializeStoreGuard } from './initialize-store.guard';
import { Store } from '@ngrx/store';
import { SET_STORE } from '../reducers/current-store-reducer';
import { StoreService } from '../services/store.service';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { AppState } from '../entities/app-state';
import { Router } from '@angular/router';

describe('InitializeStoreGuard', () => {
    let store: jasmine.SpyObj<Store<AppState>>;
    let storeService: jasmine.SpyObj<StoreService>;
    let router: jasmine.SpyObj<Router>;
    beforeEach(() => {
        store = jasmine.createSpyObj('Store', ['select']);
        storeService = jasmine.createSpyObj('StoreService', ['getStore']);
        router = jasmine.createSpyObj('Router', ['navigate']);
        TestBed.configureTestingModule({
            providers: [
                InitializeStoreGuard,
                {provide: Store, useValue: store},
                {provide: StoreService, useValue: storeService},
                {provide: Router, useValue: router},
            ]
        });
    });

    it('should fetch the store from the server and write it to the app store if the user has an "admin" role and the store param is specified', inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
        let dispatchSpy = jasmine.createSpy('dispatch');
        store.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['admin']})),
            {dispatch: dispatchSpy}
        );
        storeService.getStore.and.returnValue(of({name: 'some amazing store'}));
        guard.canActivate(<any>{queryParams: {store: 'some store'}}).subscribe(canActivate => {
            expect(canActivate).toEqual(true);
            expect(dispatchSpy.calls.mostRecent().args[0].type).toEqual('SET_STORE');
            expect(dispatchSpy.calls.mostRecent().args[0].store.name).toEqual('some amazing store');
        });
    }));

    it('should fetch the store from the server and write it to the app store if the user has an "employee" role and the store param is specified', inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
        let dispatchSpy = jasmine.createSpy('dispatch');
        store.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['employee']})),
            {dispatch: dispatchSpy}
        );
        storeService.getStore.and.returnValue(of({name: 'some amazing store'}));
        guard.canActivate(<any>{queryParams: {store: 'some store'}}).subscribe(canActivate => {
            expect(canActivate).toEqual(true);
            expect(dispatchSpy.calls.mostRecent().args[0].type).toEqual('SET_STORE');
            expect(dispatchSpy.calls.mostRecent().args[0].store.name).toEqual('some amazing store');
        });
    }));


    it('should write first enabled store from userInfo to the app store when there is no store param in the query', inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
        let dispatchSpy = jasmine.createSpy('dispatch');
        store.select.and.returnValues(
            of(AggregatedUserInfo.create({
                roles: ['user'],
                _embedded: {
                    store: [
                        {
                            name: 'dabada',
                            status: 'deleted'
                        },
                        {
                            name: 'some store',
                            status: 'active'
                        }]
                }
            })),
            {dispatch: dispatchSpy}
        );
        guard.canActivate(<any>{queryParams: {}}).subscribe(canActivate => {
            expect(canActivate).toEqual(true);
            expect(dispatchSpy.calls.argsFor(0)[0].type).toEqual('SET_STORE');
            expect(dispatchSpy.calls.argsFor(0)[0].store.name).toEqual('some store');
        });
    }));

    it('should write to the application store the store, specified in the queryParams', inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
        let dispatchSpy = jasmine.createSpy('dispatch');
        store.select.and.returnValues(
            of(AggregatedUserInfo.create({
                roles: ['user'],
                _embedded: {
                    store: [
                        {name: 'dabada', status: 'deleted', id: 1},
                        {name: 'someStore', status: 'active', id: 2},
                        {name: 'someStore1', status: 'active', id: 3},
                        {name: 'someStore2', status: 'active', id: 4}]
                }
            })),
            {dispatch: dispatchSpy}
        );

        guard.canActivate(<any>{queryParams: {store: '3'}}).subscribe(canActivate => {
            expect(canActivate).toEqual(true);
            expect(dispatchSpy.calls.argsFor(0)[0].type).toEqual('SET_STORE');
            expect(dispatchSpy.calls.argsFor(0)[0].store.name).toEqual('someStore1');
        });
    }));

    it('should write to the application store first enabled store, if specified in the queryParams store is deleted', inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
        let dispatchSpy = jasmine.createSpy('dispatch');
        store.select.and.returnValues(
            of(AggregatedUserInfo.create({
                roles: ['user'],
                _embedded: {
                    store: [
                        {name: 'dabada', status: 'deleted'},
                        {name: 'someStore', status: 'active'},
                        {name: 'someStore1', status: 'deleted'},
                        {name: 'someStore2', status: 'active'}]
                }
            })),
            {dispatch: dispatchSpy}
        );

        guard.canActivate(<any>{queryParams: {store: 'someStore1'}}).subscribe(canActivate => {
            expect(canActivate).toEqual(true);
            expect(dispatchSpy.calls.argsFor(0)[0].type).toEqual('SET_STORE');
            expect(dispatchSpy.calls.argsFor(0)[0].store.name).toEqual('someStore');
        });
    }));

    it('should redirect to store-not-found error page when an admin tries to fetch non-existent store',
        inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
            store.select.and.returnValue(of(AggregatedUserInfo.create({roles: ['admin']})));
            storeService.getStore.and.returnValue(throwError({}));
            guard.canActivate(<any>{queryParams: {store: 1}}).subscribe(canActivate => {
                expect(canActivate).toEqual(false);
                expect(router.navigate).toHaveBeenCalledTimes(1);
                expect(router.navigate.calls.mostRecent().args[0][0]).toEqual('/store-not-found');
            });

        }));

});
