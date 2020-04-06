import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormComponent } from './address-form.component';
import { Component, forwardRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from '../../../core/entities/orders/address';
import { ValidationErrorsSnackbarComponent } from '../../../shared/validation-errors-snackbar/validation-errors-snackbar.component';
import { ErrorSnackbarConfig } from '../../../core/entities/error-snackbar-config';

describe('AddressFormComponent', () => {
    let component: AddressFormComponent;
    let fixture: ComponentFixture<AddressFormComponent>;

    let snackBar: jasmine.SpyObj<MatSnackBar>;

    beforeEach(async(() => {
        snackBar = jasmine.createSpyObj(['open', 'openFromComponent']);

        TestBed.configureTestingModule({
            declarations: [AddressFormComponent, CountryAutocompleteStubComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports: [FormsModule],
            providers: [
                {provide: MatSnackBar, useValue: snackBar},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddressFormComponent);
        component = fixture.componentInstance;
        component.address = <Address>{};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit onSave event on save() if the form is valid', () => {
        spyOn(component.onSave, 'emit');
        component.save(true);
        expect(component.onSave.emit).toHaveBeenCalledTimes(1);
    });

    it('should emit onSave event on save() if the form is NOT valid', () => {
        spyOn(component.onSave, 'emit');
        component.save(false);
        expect(component.onSave.emit).not.toHaveBeenCalled();
    });

    it('should show an error snackbar on save() if the form is NOT valid', async () => {
        component.save(false);
        expect(snackBar.openFromComponent).toHaveBeenCalledWith(ValidationErrorsSnackbarComponent, new ErrorSnackbarConfig());
    });

    it('should NOT show an error snackbar on save() if the form is valid', async () => {
        component.save(true);
        expect(snackBar.openFromComponent).not.toHaveBeenCalled();
    });
});

@Component({
    selector: 'sft-country-autocomplete', template: '',
    providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CountryAutocompleteStubComponent), multi: true}]
})
export class CountryAutocompleteStubComponent implements ControlValueAccessor {
    registerOnChange(fn: any): void {
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(obj: any): void {
    }

}

