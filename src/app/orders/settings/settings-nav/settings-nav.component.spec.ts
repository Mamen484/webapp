import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsNavComponent } from './settings-nav.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { EMPTY } from 'rxjs';

describe('SettingsNavComponent', () => {
    let component: SettingsNavComponent;
    let fixture: ComponentFixture<SettingsNavComponent>;
    let appStore: jasmine.SpyObj<Store<AppState>>;

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj('Store spy', ['select']);
        TestBed.configureTestingModule({
            declarations: [SettingsNavComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Store, useValue: appStore},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsNavComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        appStore.select.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
