import { TestBed, inject } from '@angular/core/testing';

import { InitializeStoreGuard } from './initialize-store.guard';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { SET_STORE } from '../reducers/current-store-reducer';
import { StoreService } from '../services/store.service';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';

describe('InitializeStoreGuard', () => {
    let store;
    let storeService;
    beforeEach(() => {
        store = jasmine.createSpyObj('Store', ['select']);
        storeService = jasmine.createSpyObj('StoreService', ['getStore']);
        TestBed.configureTestingModule({
            providers: [
                InitializeStoreGuard,
                {provide: Store, useValue: store},
                {provide: StoreService, useValue: storeService}
            ]
        });
    });

    it('should fetch the store from the server and write it to the app store if the user has an "admin" role and the store param is specified', inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
        let dispatchSpy = jasmine.createSpy('dispatch');
        store.select.and.returnValues(
            Observable.of(AggregatedUserInfo.create({roles: ['admin']})),
            {dispatch: dispatchSpy}
        );
        storeService.getStore.and.returnValue(Observable.of('some amazing store'));
        guard.canActivate(<any>{queryParams: {store: 'some store'}}).subscribe(canActivate => {
            expect(canActivate).toEqual(true);
            expect(dispatchSpy.calls.mostRecent().args[0].type).toEqual('SET_STORE');
            expect(dispatchSpy.calls.mostRecent().args[0].store).toEqual('some amazing store');
        });
    }));

    it('should fetch the store from the server and write it to the app store if the user has an "employee" role and the store param is specified', inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
        let dispatchSpy = jasmine.createSpy('dispatch');
        store.select.and.returnValues(
            Observable.of(AggregatedUserInfo.create({roles: ['employee']})),
            {dispatch: dispatchSpy}
        );
        storeService.getStore.and.returnValue(Observable.of('some amazing store'));
        guard.canActivate(<any>{queryParams: {store: 'some store'}}).subscribe(canActivate => {
            expect(canActivate).toEqual(true);
            expect(dispatchSpy.calls.mostRecent().args[0].type).toEqual('SET_STORE');
            expect(dispatchSpy.calls.mostRecent().args[0].store).toEqual('some amazing store');
        });
    }));


    it('should write first enabled store from userInfo to the app store when there is no store param in the query', inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
        let dispatchSpy = jasmine.createSpy('dispatch');
        store.select.and.returnValues(
            Observable.of(AggregatedUserInfo.create({
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
            Observable.of(AggregatedUserInfo.create({
                roles: ['user'],
                _embedded: {
                    store: [
                        {name: 'dabada', status: 'deleted'},
                        {name: 'someStore', status: 'active'},
                        {name: 'someStore1', status: 'active'},
                        {name: 'someStore2', status: 'active'}]
                }
            })),
            {dispatch: dispatchSpy}
        );

        guard.canActivate(<any>{queryParams: {store: 'someStore1'}}).subscribe(canActivate => {
            expect(canActivate).toEqual(true);
            expect(dispatchSpy.calls.argsFor(0)[0].type).toEqual('SET_STORE');
            expect(dispatchSpy.calls.argsFor(0)[0].store.name).toEqual('someStore1');
        });
    }));

    it('should write to the application store first enabled store, if specified in the queryParams store is deleted', inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
        let dispatchSpy = jasmine.createSpy('dispatch');
        store.select.and.returnValues(
            Observable.of(AggregatedUserInfo.create({
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


});
