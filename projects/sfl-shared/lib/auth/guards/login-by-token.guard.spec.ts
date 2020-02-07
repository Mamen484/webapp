import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { SflLocalStorageService } from 'sfl-shared/services';
import { SflLoginByTokenGuard } from './login-by-token.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    template: '',
})
class BlankComponent {}

describe('SflLoginByTokenGuard', () => {

    let setitemSpy: jasmine.Spy;
    let router: Router;

    beforeEach(() => {
        setitemSpy = jasmine.createSpy('localStorage.setItem');

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([{
                    path: '',
                    component: BlankComponent,
                    canActivate: [SflLoginByTokenGuard]
                }])
            ],
            providers: [
                SflLoginByTokenGuard,
                {provide: SflLocalStorageService, useValue: {setItem: setitemSpy}}
            ],
            declarations: [BlankComponent]
        });

        router = TestBed.get(Router);
    });

    it('should return Authorization into the local storage whn the token is provided',
        fakeAsync(() => {
            router.navigate([''], {queryParams: {token: 'some token'}});
            tick();
            expect(setitemSpy).toHaveBeenCalledWith('Authorization', 'Bearer some token');
        }));

    it('canActivate should return true anyway',
        inject([SflLoginByTokenGuard], (guard: SflLoginByTokenGuard) => {
            expect(guard.canActivate(<any>{queryParamMap: {has: () => true}, queryParams: {token: ''}})).toEqual(true);
            expect(guard.canActivate(<any>{queryParamMap: {has: () => false}})).toEqual(true);

        }));

})
;
