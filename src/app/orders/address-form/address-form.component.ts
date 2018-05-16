import { Component, Input, OnInit } from '@angular/core';
import { Address } from '../../core/entities/orders/address';

@Component({
    selector: 'sf-address-form',
    templateUrl: './address-form.component.html',
    styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

    @Input() address: Address;

    constructor() {
    }

    ngOnInit() {
    }

}
