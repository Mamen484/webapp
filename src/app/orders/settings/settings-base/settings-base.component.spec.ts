import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsBaseComponent } from './settings-base.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SettingsBaseComponent', () => {
    let component: SettingsBaseComponent;
    let fixture: ComponentFixture<SettingsBaseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SettingsBaseComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsBaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
