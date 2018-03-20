import { TestBed, inject, async, tick, fakeAsync } from '@angular/core/testing';

import { DefaultPageGuard } from './default-page.guard';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { BlankComponent } from '../../shared/blank.component';

describe('DefaultPageGuard', () => {
    let store;
    let router: Router;
    let guard: DefaultPageGuard;
    beforeEach(() => {
        store = jasmine.createSpyObj('store', ['select']);
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {path: '', component: BlankComponent},
                    {path: 'home', component: BlankComponent},
                    {path: 'admin', component: BlankComponent},
                ])
            ],
            providers: [
                DefaultPageGuard,
                {provide: Store, useValue: store},
            ],
            declarations: [BlankComponent]
        });
    });

    beforeEach(() => {
        guard = TestBed.get(DefaultPageGuard);
        router = TestBed.get(Router);
    });

    it('should redirect to /admin if the user has role "admin"', fakeAsync(() => {
        store.select.and.returnValue(Observable.of({roles: ['admin']}));
        expect(guard.canActivate(<any>{queryParams: {}})).toEqual(false);
        tick();
        expect(router.url).toEqual('/admin');
    }));

    it('should redirect to /admin if the user has role "employee"', fakeAsync(() => {
        store.select.and.returnValue(Observable.of({roles: ['employee']}));
        expect(guard.canActivate(<any>{queryParams: {}})).toEqual(false);
        tick();
        expect(router.url).toEqual('/admin');
    }));

    it('should redirect to /home if the user has role "user"', fakeAsync(() => {
        store.select.and.returnValue(Observable.of({roles: ['user']}));
        expect(guard.canActivate(<any>{queryParams: {}})).toEqual(false);
        tick();
        expect(router.url).toEqual('/home');
    }));

    it('should redirect to /home?store=123 if the user has role "user" and store query param equals to 123', fakeAsync(() => {
        store.select.and.returnValue(Observable.of({roles: ['user']}));
        expect(guard.canActivate(<any>{queryParams: {store: 123}})).toEqual(false);
        tick();
        expect(router.url).toEqual('/home?store=123');
    }));

    it('should redirect to /home?store=123 if the user has role "admin" and store query param equals to 123', fakeAsync(() => {
        store.select.and.returnValue(Observable.of({roles: ['admin']}));
        expect(guard.canActivate(<any>{queryParams: {store: 123}})).toEqual(false);
        tick();
        expect(router.url).toEqual('/home?store=123');
    }));
});
