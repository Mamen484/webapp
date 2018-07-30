import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

export enum AddressType {
    billingAddress = 'billingAddress',
    shippingAddress = 'shippingAddress',
}

@Component({
    selector: 'sf-address-saved-snackbar',
    templateUrl: './address-saved-snackbar.component.html',
    styleUrls: ['./address-saved-snackbar.component.scss']
})
export class AddressSavedSnackbarComponent implements OnInit {

    addressTypes = AddressType;
    addressType: AddressType;

    constructor(@Inject(MAT_SNACK_BAR_DATA) {type}: { type: AddressType }) {
        this.addressType = type;
    }

    ngOnInit() {
    }

}
