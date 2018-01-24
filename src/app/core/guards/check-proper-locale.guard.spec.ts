import { TestBed, inject } from '@angular/core/testing';
import { CheckProperLocaleGuard } from './check-proper-locale.guard';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import { LocaleIdService } from '../services/locale-id.service';
import { environment } from '../../../environments/environment';
import { WindowRefService } from '../services/window-ref.service';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('CheckProperLocaleGuard', () => {


    describe('the same locale in the /me response and the localization of the project', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule.withRoutes([])],
                providers: [
                    CheckProperLocaleGuard,
                    {provide: UserService, useValue: {fetchAggregatedInfo: () => Observable.of({language: 'it_IT'})}},
                    {provide: LocaleIdService, useValue: {localeId: 'it'}},
                    {provide: WindowRefService, useValue: {}},
                    Location,
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
        let locationSpy: jasmine.SpyObj<Location>;
        beforeEach(() => {
            locationSpy = jasmine.createSpyObj(['path']);
            TestBed.configureTestingModule({
                imports: [RouterTestingModule.withRoutes([])],
                providers: [
                    CheckProperLocaleGuard,
                    {provide: UserService, useValue: {fetchAggregatedInfo: () => Observable.of({language: 'en_US'})}},
                    {provide: LocaleIdService, useValue: {localeId: 'it'}},
                    {provide: WindowRefService, useValue: {nativeWindow: {location: {href: ''}}}},
                    {provide: Location, useValue: locationSpy},
                ]
            });
        });

        it('should redirect the user to the valid localization folder and return false',
            inject([CheckProperLocaleGuard, WindowRefService], (guard: CheckProperLocaleGuard, windowRef: WindowRefService) => {
            environment.production = 'true';
            locationSpy.path.and.returnValue('');
            guard.canActivate().subscribe(canActivate => {
                expect(windowRef.nativeWindow.location.href).toEqual('/v3/en/');
                expect(canActivate).toEqual(false);
            })
        }));

        it('should add a slash before the whole path if it doesn\'t exist to prevent extra redirects on the server',
            inject([CheckProperLocaleGuard, WindowRefService], (guard: CheckProperLocaleGuard, windowRef: WindowRefService) => {
                environment.production = 'true';
                locationSpy.path.and.returnValue('?store=307');
                guard.canActivate().subscribe(canActivate => {
                    expect(windowRef.nativeWindow.location.href).toEqual('/v3/en/?store=307');
                    expect(canActivate).toEqual(false);
                })
            }));

        it('should NOT add a slash before the whole path if it starts from the slash',
            inject([CheckProperLocaleGuard, WindowRefService], (guard: CheckProperLocaleGuard, windowRef: WindowRefService) => {
                environment.production = 'true';
                locationSpy.path.and.returnValue('/home?store=307');
                guard.canActivate().subscribe(canActivate => {
                    expect(windowRef.nativeWindow.location.href).toEqual('/v3/en/home?store=307');
                    expect(canActivate).toEqual(false);
                })
            }));
    });

});
