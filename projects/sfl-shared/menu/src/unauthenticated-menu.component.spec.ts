import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnauthenticatedMenuComponent } from './unauthenticated-menu.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SflLocaleIdService } from 'sfl-shared/services';
import { SFL_BASE_HREF, SFL_LANGUAGE_OPTIONS } from 'sfl-shared/entities';
import { MatMenuModule } from '@angular/material';

describe('UnauthenticatedMenuComponent', () => {

    let fixture: ComponentFixture<UnauthenticatedMenuComponent>;
    let component: UnauthenticatedMenuComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatMenuModule],
            declarations: [UnauthenticatedMenuComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: SflLocaleIdService, useValue: {localeId: 'en'}},
                {provide: SFL_BASE_HREF, useValue: 'baseHref'},
                {provide: SFL_LANGUAGE_OPTIONS, useValue: {'en': 'English'}},
            ],
        });

        fixture = TestBed.createComponent(UnauthenticatedMenuComponent);
        component = fixture.componentInstance;
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    })
});
