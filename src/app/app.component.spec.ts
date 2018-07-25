import { AppComponent } from './app.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AppState } from './core/entities/app-state';
import { of, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { WindowRefService } from './core/services/window-ref.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AggregatedUserInfo } from './core/entities/aggregated-user-info';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let router = <any>{};
    let windowRef = <any>{};

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj(['select']);
        router.events = new Subject();
        windowRef.nativeWindow = jasmine.createSpyObj(['gtag']);
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [
                {provide: Store, useValue: appStore},
                {provide: Router, useValue: router},
                {provide: WindowRefService, useValue: windowRef},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should run gtag if a user is not an admin', () => {
        appStore.select.and.returnValue(
            of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1'}))
        );
        fixture.detectChanges();
        expect(windowRef.nativeWindow.gtag).toHaveBeenCalledTimes(1);
    });

    it('should NOT run gtag if a user is an admin', () => {
        appStore.select.and.returnValue(
            of(AggregatedUserInfo.create({roles: ['admin'], token: 'token_1'}))
        );
        fixture.detectChanges();
        expect(windowRef.nativeWindow.gtag).not.toHaveBeenCalled();
    });

    it('should NOT show livechat if a user is an admin and country is US', () => {
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['admin'], token: 'token_1'})),
            of({country: 'US'}),
        );
        fixture.detectChanges();
        expect(component.showLivechat).toEqual(false);
    });

    it('should NOT show livechat if a user is an NOT admin and country is NOT US', () => {
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1'})),
            of({country: 'FR'}),
        );
        fixture.detectChanges();
        expect(component.showLivechat).toEqual(false);
    });

    it('should show livechat if a user is an NOT admin and country is US', () => {
        appStore.select.and.returnValues(
            of(AggregatedUserInfo.create({roles: ['user'], token: 'token_1'})),
            of({country: 'US'}),
        );
        fixture.detectChanges();
        expect(component.showLivechat).toEqual(true);
    });
});
