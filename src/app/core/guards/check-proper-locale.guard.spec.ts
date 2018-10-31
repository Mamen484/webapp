import { inject, TestBed } from '@angular/core/testing';
import { CheckProperLocaleGuard } from './check-proper-locale.guard';
import { of } from 'rxjs';
import { SflLocaleIdService, SflUserService, SflWindowRefService } from 'sfl-shared';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('CheckProperLocaleGuard', () => {
    let userService: jasmine.SpyObj<SflUserService>;


    describe('the same locale in the /me response and the localization of the project', () => {
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RouterTestingModule.withRoutes([])],
                providers: [
                    CheckProperLocaleGuard,
                    {provide: SflLocaleIdService, useValue: {localeId: 'it'}},
                    {provide: SflWindowRefService, useValue: {nativeWindow: {location: {href: ''}}}},
                    {provide: SflUserService, useValue: userService},
                    Location,
                ]
            });
        });

        it('should return true', async () => {
            const guard = TestBed.get(CheckProperLocaleGuard);
            userService.fetchAggregatedInfo.and.returnValue(of({language: 'it'}));
            environment.production = 'true';
            const canActivate = await guard.canActivate().toPromise();
            expect(canActivate).toEqual(true);
        });
    });

    describe('different locales in the /me response and the localization of the project', () => {
        let locationSpy: jasmine.SpyObj<Location>;
        beforeEach(() => {
            locationSpy = jasmine.createSpyObj(['path']);
            TestBed.configureTestingModule({
                imports: [RouterTestingModule.withRoutes([])],
                providers: [
                    CheckProperLocaleGuard,
                    {provide: SflLocaleIdService, useValue: {localeId: 'it'}},
                    {provide: SflWindowRefService, useValue: {nativeWindow: {location: {href: ''}}}},
                    {provide: Location, useValue: locationSpy},
                    {provide: SflUserService, useValue: userService},
                ]
            });
        });

        it('should redirect the user to the valid localization folder and return false',
            inject([CheckProperLocaleGuard, SflWindowRefService],
                async (guard: CheckProperLocaleGuard, windowRef: SflWindowRefService) => {
                    environment.production = 'true';
                    userService.fetchAggregatedInfo.and.returnValue(of({language: 'en-US'}));
                    locationSpy.path.and.returnValue('');
                    const canActivate = await guard.canActivate().toPromise();
                    expect(windowRef.nativeWindow.location.href).toEqual('/v3/en/');
                    expect(canActivate).toEqual(false);
                }));

        it('should add a slash before the whole path if it doesn\'t exist to prevent extra redirects on the server',
            inject([CheckProperLocaleGuard, SflWindowRefService],
                async (guard: CheckProperLocaleGuard, windowRef: SflWindowRefService) => {
                    environment.production = 'true';
                    userService.fetchAggregatedInfo.and.returnValue(of({language: 'en-US'}));
                    locationSpy.path.and.returnValue('?store=307');
                    const canActivate = await guard.canActivate().toPromise();
                    expect(windowRef.nativeWindow.location.href).toEqual('/v3/en/?store=307');
                    expect(canActivate).toEqual(false);
                }));

        it('should NOT add a slash before the whole path if it starts from the slash',
            inject([CheckProperLocaleGuard, SflWindowRefService],
                async (guard: CheckProperLocaleGuard, windowRef: SflWindowRefService) => {
                    environment.production = 'true';
                    userService.fetchAggregatedInfo.and.returnValue(of({language: 'en-US'}));
                    locationSpy.path.and.returnValue('/?store=307');
                    const canActivate = await guard.canActivate().toPromise();
                    expect(windowRef.nativeWindow.location.href).toEqual('/v3/en/?store=307');
                    expect(canActivate).toEqual(false);
                }));
    });
});
