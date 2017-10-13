import { TestBed, inject } from '@angular/core/testing';

import { InitializeStoreGuard } from './initialize-store.guard';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { INITIALIZE_USER_INFO } from '../reducers/user-info-reducer';
import { SET_STORE } from '../reducers/current-store-reducer';

describe('InitializeStoreGuard', () => {
    let fetchAggregatedInfoSpy: jasmine.Spy;
    let selectSpy: jasmine.Spy;
    beforeEach(() => {
        fetchAggregatedInfoSpy = jasmine.createSpy('UserService.fetchAggregatedInfo');
        selectSpy = jasmine.createSpy('appStore.select');
        TestBed.configureTestingModule({
            providers: [
                InitializeStoreGuard,
                {provide: UserService, useValue: {fetchAggregatedInfo: fetchAggregatedInfoSpy}},
                {provide: Store, useValue: {select: selectSpy}}
            ]
        });
    });

    it('should always return true', inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
        fetchAggregatedInfoSpy.and.returnValue(Observable.of({_embedded: {store: ['someStore']}}));
        selectSpy.and.returnValue({
            dispatch: () => {
            }
        });
        guard.canActivate(<any>{queryParams: {}}).subscribe(canActivate => {
            expect(canActivate).toEqual(true);
        });

    }));

    it('should write userInfo to the application store', inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
        fetchAggregatedInfoSpy.and.returnValue(Observable.of({_embedded: {store: ['someStore']}}));
        let dispatchSpy = jasmine.createSpy('store dispatch');
        selectSpy.and.returnValue({dispatch: dispatchSpy});
        guard.canActivate(<any>{queryParams: {}}).subscribe(canActivate => {
            expect(selectSpy.calls.first().args[0]).toEqual('userInfo');
            expect(dispatchSpy.calls.first().args[0].userInfo._embedded.store[0]).toEqual('someStore');
            expect(dispatchSpy.calls.first().args[0].type).toEqual(INITIALIZE_USER_INFO);
        });

    }));

    it('should write first store from userInfo to the application store when there is no store param in the query', inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
        fetchAggregatedInfoSpy.and.returnValue(Observable.of({_embedded: {store: ['someStore']}}));
        let dispatchSpy = jasmine.createSpy('store dispatch');
        selectSpy.and.returnValue({dispatch: dispatchSpy});
        guard.canActivate(<any>{queryParams: {}}).subscribe(canActivate => {
            expect(selectSpy.calls.argsFor(1)[0]).toEqual('currentStore');
            expect(dispatchSpy.calls.argsFor(1)[0].store).toEqual('someStore');
            expect(dispatchSpy.calls.argsFor(1)[0].type).toEqual(SET_STORE);
        });
    }));

    it('should write to the application store the store, specified in the queryParams', inject([InitializeStoreGuard], (guard: InitializeStoreGuard) => {
        fetchAggregatedInfoSpy.and.returnValue(Observable.of({
            _embedded: {
                store: [
                    {id: 0, name: 'zero'},
                    {id: 1, name: 'one'},
                    {id: 2, name: 'two'},
                ]
            }
        }));
        let dispatchSpy = jasmine.createSpy('store dispatch');
        selectSpy.and.returnValue({dispatch: dispatchSpy});
        guard.canActivate(<any>{queryParams: {store: 'one'}}).subscribe(canActivate => {
            expect(dispatchSpy.calls.argsFor(1)[0].store.id).toEqual(1);
        });
    }));

});
