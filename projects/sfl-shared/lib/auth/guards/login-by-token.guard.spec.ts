import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SflAuthService } from 'sfl-shared/services';
import { SflLoginByTokenGuard } from './login-by-token.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    template: '',
})
class BlankComponent {
}

describe('SflLoginByTokenGuard', () => {
    let router: Router;
    let authService: SflAuthService;

    beforeEach(() => {
        authService = jasmine.createSpyObj(['loginByToken']);

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
                {provide: SflAuthService, useValue: authService}
            ],
            declarations: [BlankComponent]
        });

        router = TestBed.inject(Router);
    });

    it('should call loginByToken()', fakeAsync(() => {
        router.navigate([''], {queryParams: {token: 'some token'}});
        tick();
        expect(authService.loginByToken).toHaveBeenCalledWith('some token');
    }));

    it('should call loginByToken() if not token specified', fakeAsync(() => {
        router.navigate([''], {queryParams: {}});
        tick();
        expect(authService.loginByToken).not.toHaveBeenCalled();
    }));

});
