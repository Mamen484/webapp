import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from '../../core/entities/orders/address';
import { clone } from 'lodash';

@Component({
    selector: 'sf-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

    @Input('address') set data(value: Address) {
        this.address = clone(value);
        this.addressCopy = clone(value);
    }

    @Output() onSave = new EventEmitter();
    addressCopy: Address;
    address: Address;

    constructor() {
    }

    ngOnInit() {
        this.addressCopy = clone(this.address);
    }

    cancel() {
        this.address = clone(this.addressCopy);
    }

    save(formValid) {
        if (formValid) {
            this.onSave.emit(clone(this.address));
        }
    }
}

