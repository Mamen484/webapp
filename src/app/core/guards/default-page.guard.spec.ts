import { TestBed, inject } from '@angular/core/testing';

import { DefaultPageGuard } from './default-page.guard';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

describe('DefaultPageGuard', () => {
    let store;
    let router;
    beforeEach(() => {
        store = jasmine.createSpyObj('store', ['select']);
        router = jasmine.createSpyObj('router', ['navigate']);
        TestBed.configureTestingModule({
            providers: [
                DefaultPageGuard,
                {provide: Store, useValue: store},
                {provide: Router, useValue: router},
            ]
        });
    });

    it('should redirect to /admin if the user has role "admin"', inject([DefaultPageGuard], (guard: DefaultPageGuard) => {
        store.select.and.returnValue(Observable.of({roles: ['admin']}));
        expect(guard.canActivate()).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/admin']);
    }));

    it('should redirect to /admin if the user has role "employee"', inject([DefaultPageGuard], (guard: DefaultPageGuard) => {
        store.select.and.returnValue(Observable.of({roles: ['employee']}));
        expect(guard.canActivate()).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/admin']);
    }));

    it('should redirect to /home if the user has role "user"', inject([DefaultPageGuard], (guard: DefaultPageGuard) => {
        store.select.and.returnValue(Observable.of({roles: ['user']}));
        expect(guard.canActivate()).toEqual(false);
        expect(router.navigate).toHaveBeenCalledWith(['/home']);
    }));
});
