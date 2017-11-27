import { TestBed, inject } from '@angular/core/testing';

import { CanLoadAdminGuard } from './can-load-admin.guard';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AggregatedUserInfo } from '../entities/aggregated-user-info';
import { UserService } from '../services/user.service';

describe('CanLoadAdminGuard', () => {

    let store;
    let router;
    let userService;
    beforeEach(() => {
        store = jasmine.createSpyObj('store', ['select', 'dispatch']);
        router = jasmine.createSpyObj('router', ['navigate']);
        userService = jasmine.createSpyObj('userService', ['fetchAggregatedInfo']);
        TestBed.configureTestingModule({
            providers: [
                CanLoadAdminGuard,
                {provide: Store, useValue: store},
                {provide: Router, useValue: router},
                {provide: UserService, useValue: userService}
            ]
        });
    });

    it('should return true if the user has "admin" role', inject([CanLoadAdminGuard], (guard: CanLoadAdminGuard) => {
        store.select.and.returnValue(Observable.of(AggregatedUserInfo.create({roles: ['admin']})));
        guard.canLoad().subscribe(canLoad => {
            expect(canLoad).toEqual(true);
        });
    }));

    it('should return true if the user has "employee" role', inject([CanLoadAdminGuard], (guard: CanLoadAdminGuard) => {
        store.select.and.returnValue(Observable.of(AggregatedUserInfo.create({roles: ['employee']})));
        guard.canLoad().subscribe(canLoad => {
            expect(canLoad).toEqual(true);
        });
    }));

    it('should return false and redirect to /home if the user has not "employee" or "admin" role', inject([CanLoadAdminGuard], (guard: CanLoadAdminGuard) => {
        store.select.and.returnValue(Observable.of(AggregatedUserInfo.create({roles: ['user']})));
        guard.canLoad().subscribe(canLoad => {
            expect(canLoad).toEqual(false);
            expect(router.navigate).toHaveBeenCalledWith(['/home']);
        });
    }));

    it('should fetch userInfo from the server when when there is NO userInfo in the app store',
        inject([CanLoadAdminGuard], (guard: CanLoadAdminGuard) => {
            store.select.and.returnValue(Observable.of(null));
            userService.fetchAggregatedInfo.and.returnValue(Observable.of(AggregatedUserInfo.create({roles: ['admin']})));
            guard.canLoad().subscribe(() =>
                expect(userService.fetchAggregatedInfo).toHaveBeenCalledTimes(1));

        }));

    it('should NOT fetch userInfo from the server when when there is userInfo in the app store',
        inject([CanLoadAdminGuard], (guard: CanLoadAdminGuard) => {
            store.select.and.returnValue(Observable.of(AggregatedUserInfo.create({roles: ['admin']})));
            guard.canLoad().subscribe(() =>
                expect(userService.fetchAggregatedInfo).toHaveBeenCalledTimes(0));

        }));
});
