import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CountryAutocompleteComponent } from './country-autocomplete.component';
import { LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material';
import { FormControl } from '@angular/forms';

describe('CountryAutocompleteComponent', () => {
    let component: CountryAutocompleteComponent;
    let fixture: ComponentFixture<CountryAutocompleteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CountryAutocompleteComponent],
            providers: [{provide: LOCALE_ID, useValue: 'en'}],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [MatAutocompleteModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CountryAutocompleteComponent);
        component = fixture.componentInstance;
        component.onChange = () => {};
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it ('should NOT display any country initially if not ISO-alpha-2 value provided.', fakeAsync(() => {
        component.controlDir = <any>{control: new FormControl()};
        fixture.detectChanges();
        component.controlDir.control.setValue('some non-alpha-2 string');
        tick();
        expect(component.controlDir.control.value).toEqual('');
    }));

    it ('should display a country that matches provided initially ISO-alpha-2 code.', fakeAsync(() => {
        component.controlDir = <any>{control: new FormControl()};
        fixture.detectChanges();
        component.controlDir.control.setValue('FR');
        tick();
        expect(component.controlDir.control.value).toEqual('France');
    }));
});
