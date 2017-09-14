import { TestBed, inject } from '@angular/core/testing';
import { CheckProperLocaleGuard } from './check-proper-locale.guard';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import { LocaleIdService } from '../services/locale-id.service';
import { environment } from '../../../environments/environment';
import { WindowRefService } from '../services/window-ref.service';

describe('CheckProperLocaleGuard', () => {


    describe('the same locale in the /me response and the localization of the project', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    CheckProperLocaleGuard,
                    {provide: UserService, useValue: {fetchAggregatedInfo: () => Observable.of({language: 'it_IT'})}},
                    {provide: LocaleIdService, useValue: {localeId: 'it'}},
                    {provide: WindowRefService, useValue: {}}
                ]
            });
        });

        it('should return true', inject([CheckProperLocaleGuard], (guard: CheckProperLocaleGuard) => {
            environment.production = 'true';
            guard.canActivate().subscribe(canActivate => {
                expect(canActivate).toEqual(true);
            })
        }));
    });

    describe('different locales in the /me response and the localization of the project', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    CheckProperLocaleGuard,
                    {provide: UserService, useValue: {fetchAggregatedInfo: () => Observable.of({language: 'en_US'})}},
                    {provide: LocaleIdService, useValue: {localeId: 'it'}},
                    {provide: WindowRefService, useValue: {nativeWindow: {location: {href: ''}}}}
                ]
            });
        });

        it('should redirect the user to the valid localization folder and return false',
            inject([CheckProperLocaleGuard, WindowRefService], (guard: CheckProperLocaleGuard, windowRef: WindowRefService) => {
            environment.production = 'true';
            guard.canActivate().subscribe(canActivate => {
                expect(windowRef.nativeWindow.location.href).toEqual('/v3/en');
                expect(canActivate).toEqual(false);
            })
        }));
    });

});
