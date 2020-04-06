import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressSavedSnackbarComponent, AddressType } from './address-saved-snackbar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

describe('AddressSavedSnackbarComponent', () => {
    let component: AddressSavedSnackbarComponent;
    let fixture: ComponentFixture<AddressSavedSnackbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddressSavedSnackbarComponent],
            providers: [
                {provide: MAT_SNACK_BAR_DATA, useValue: {type: AddressType.billingAddress}},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddressSavedSnackbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign an address type', () => {
        expect(component.addressType).toEqual(AddressType.billingAddress);
    });

    it('should display a proper message for a billing address', () => {
        component.addressType = AddressType.billingAddress;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent.trim())
            .toEqual('Your billing address has been saved.');
    });

    it('should display a proper message for a shipping address', () => {
        component.addressType = AddressType.shippingAddress;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent.trim())
            .toEqual('Your shipping address has been saved.');
    });

});
