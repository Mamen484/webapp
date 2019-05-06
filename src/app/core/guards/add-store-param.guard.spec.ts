import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Location } from '@angular/common';

import { AddStoreParamGuard } from './add-store-param.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../entities/app-state';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AddStoreParamGuard', () => {
    let store: jasmine.SpyObj<Store<AppState>>;
    beforeEach(() => {
        store = jasmine.createSpyObj('NgRx store spy', ['select']);
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: '', canActivateChild: [AddStoreParamGuard], children: [
                            {path: '', component: MockComponent}
                        ]
                    },
                ]),
            ],
            providers: [
                AddStoreParamGuard,
                {provide: Store, useValue: store},
            ],
            declarations: [MockComponent],
        });
    });

    it('should add a store param to the route if it doesn\'t exist', fakeAsync(() => {
        const router: Router = TestBed.get(Router);
        const location: Location = TestBed.get(Location);

        store.select.and.returnValue(of({id: 441}));
        router.navigate(['/']);
        tick();
        expect(location.path()).toBe('/?store=441');
    }));

    it('should keep query existing params', fakeAsync(() => {
        const router: Router = TestBed.get(Router);
        const location: Location = TestBed.get(Location);

        store.select.and.returnValue(of({id: 441}));
        router.navigate(['/'], {queryParams: {smth1: 23, smth2: 'someText'}});
        tick();
        expect(location.path()).toBe('/?smth1=23&smth2=someText&store=441');
    }));

    it('should take store query param from existing query params if exists', fakeAsync(() => {
        const router: Router = TestBed.get(Router);
        const location: Location = TestBed.get(Location);

        store.select.and.returnValue(of({id: 441}));
        router.navigate(['/'], {queryParams: {smth1: 23, smth2: 'someText', store: 125}});
        tick();
        expect(location.path()).toBe('/?smth1=23&smth2=someText&store=125');
    }));
});

@Component({
    template: '',
})
class MockComponent {
}
