import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SflCountrySelectComponent } from './country-select.component';
import { LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core';
import { SFL_BASE_HREF } from 'sfl-shared/entities';

describe('SflCountrySelectComponent', () => {
    let fixture: ComponentFixture<SflCountrySelectComponent>;
    let component: SflCountrySelectComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SflCountrySelectComponent],
            providers: [
                {provide: LOCALE_ID, useValue: 'en'},
                {provide: SFL_BASE_HREF, useValue: 'baseHref'},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        });

        fixture = TestBed.createComponent(SflCountrySelectComponent);
        component = fixture.componentInstance;
    });

    it('should assign baseHref on construction', () => {
        expect(component.baseHref).toBe('baseHref/en');
    });

    it('should assign onChange on registerOnChange call', () => {
        component.registerOnChange(() => {
        });
        expect(component.onChange).toBeDefined();
    });

    it('should assign onTouched on registerOnTouched call', () => {
        component.registerOnTouched(() => {
        });
        expect(component.onTouched).toBeDefined();
    });

    it('should write a select value on writeValue call', () => {
        component.writeValue('some value');
        expect(component.select.value).toBe('some value');
    });
});

describe('SflCountrySelectComponent value accessor', () => {
    it('should write valueAccessor property', () => {
        let component = new SflCountrySelectComponent(<any>{}, 'baseHref', 'en');
        expect(component.controlDir.valueAccessor).toBe(component);
    });
});