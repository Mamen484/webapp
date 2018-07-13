import { TestBed } from '@angular/core/testing';

import { CanLoadAdminGuard } from './can-load-admin.guard';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { WindowRefService } from '../services/window-ref.service';
import { environment } from '../../../environments/environment';

describe('CanLoadAdminGuard', () => {

    let store;
    let router;
    let userService;
    let windowRef;
    beforeEach(() => {
        store = jasmine.createSpyObj('store', ['select', 'dispatch']);
        router = jasmine.createSpyObj('router', ['navigate']);
        userService = jasmine.createSpyObj('userService', ['fetchAggregatedInfo']);
        windowRef = {nativeWindow: {location: {href: ''}}};
        TestBed.configureTestingModule({
            providers: [
                CanLoadAdminGuard,
                {provide: Store, useValue: store},
                {provide: Router, useValue: router},
                {provide: UserService, useValue: userService},
                {provide: WindowRefService, useValue: windowRef},
            ]
        });
    });

    it('should return false', async () => {
        let guard = TestBed.get(CanLoadAdminGuard);
        expect(await guard.canLoad().toPromise()).toEqual(false);
    });

    // it('should return true if the user has "admin" role', inject([CanLoadAdminGuard], (guard: CanLoadAdminGuard) => {
    //     store.select.and.returnValue(of(AggregatedUserInfo.create({roles: ['admin']})));
    //     guard.canLoad().subscribe(canLoad => {
    //         expect(canLoad).toEqual(true);
    //     });
    // }));
    //
    // it('should return true if the user has "employee" role', inject([CanLoadAdminGuard], (guard: CanLoadAdminGuard) => {
    //     store.select.and.returnValue(of(AggregatedUserInfo.create({roles: ['employee']})));
    //     guard.canLoad().subscribe(canLoad => {
    //         expect(canLoad).toEqual(true);
    //     });
    // }));
    //
    // it('should return false and redirect to /home if the user has not "employee" or "admin" role', inject([CanLoadAdminGuard],
    //     (guard: CanLoadAdminGuard) => {
    //     store.select.and.returnValue(of(AggregatedUserInfo.create({roles: ['user']})));
    //     guard.canLoad().subscribe(canLoad => {
    //         expect(canLoad).toEqual(false);
    //         expect(router.navigate).toHaveBeenCalledWith(['/home']);
    //     });
    // }));
    //
    // it('should fetch userInfo from the server when when there is NO userInfo in the app store',
    //     inject([CanLoadAdminGuard], (guard: CanLoadAdminGuard) => {
    //         store.select.and.returnValue(of(null));
    //         userService.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['admin']})));
    //         guard.canLoad().subscribe(() =>
    //             expect(userService.fetchAggregatedInfo).toHaveBeenCalledTimes(1));
    //
    //     }));
    //
    // it('should NOT fetch userInfo from the server when when there is userInfo in the app store',
    //     inject([CanLoadAdminGuard], (guard: CanLoadAdminGuard) => {
    //         store.select.and.returnValue(of(AggregatedUserInfo.create({roles: ['admin']})));
    //         guard.canLoad().subscribe(() =>
    //             expect(userService.fetchAggregatedInfo).toHaveBeenCalledTimes(0));
    //
    //     }));
});
