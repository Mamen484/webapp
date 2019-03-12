import { AppComponent } from './app.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AppState } from './core/entities/app-state';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SflAuthService, SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let router = <any>{};
    let windowRef = <any>{};
    let location: jasmine.SpyObj<Location>;
    let userService: jasmine.SpyObj<SflUserService>;
    let authService: jasmine.SpyObj<SflAuthService>;

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj(['select']);
        userService = jasmine.createSpyObj('SflUserService', ['fetchAggregatedInfo']);
        router.events = new Subject();
        authService = jasmine.createSpyObj('SflAuthService spy', ['removeTokenFromUrl']);
        windowRef.nativeWindow = {gtag: jasmine.createSpy(), FS: {identify: jasmine.createSpy()}, Appcues: {identify: jasmine.createSpy()}};
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [
                {provide: Store, useValue: appStore},
                {provide: Router, useValue: router},
                {provide: SflWindowRefService, useValue: windowRef},
                {provide: Location, useValue: location},
                {provide: SflUserService, useValue: userService},
                {provide: SflAuthService, useValue: authService},
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

});
