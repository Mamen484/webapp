import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../core/entities/orders/order';
import { cloneDeep } from 'lodash';
import { Store as UserStore } from '../../../core/entities/store';
import { flatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { OrdersService } from '../../../core/services/orders.service';
import { MatSnackBar } from '@angular/material';
import { AddressSavedSnackbarComponent } from '../address-saved-snackbar/address-saved-snackbar.component';

@Component({
    selector: 'sf-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

    @Input() order: Order;
    orderCopy: Order;

    constructor(protected appStore: Store<AppState>,
                protected ordersService: OrdersService,
                protected snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.orderCopy = cloneDeep(this.order);
    }

    resetBillingAddress() {
        this.orderCopy.billingAddress = cloneDeep(this.order.billingAddress);
    }

    resetShippingAddress() {
        this.orderCopy.shippingAddress = cloneDeep(this.order.shippingAddress);
    }

    saveBillingAddress() {
        this.saveAddress({
            shippingAddress: this.order.shippingAddress,
            billingAddress: this.orderCopy.billingAddress
        }, 'billingAddress');
    }

    saveShippingAddress() {
        this.saveAddress({
            shippingAddress: this.orderCopy.shippingAddress,
            billingAddress: this.order.billingAddress
        }, 'shippingAddress');
    }

    protected saveAddress(data, addressType) {
        this.appStore.select('currentStore').pipe(
            flatMap((store: UserStore) => this.ordersService.modifyOrder(store.id, this.orderCopy.id, data)))
            .subscribe(
                () => {
                    this.order[addressType] = cloneDeep(this.orderCopy[addressType]);
                    this.notifySuccess(addressType)
                },
                error => this.notifyError(error),
            );
    }

    protected notifySuccess(addressType) {
        this.snackBar.openFromComponent(AddressSavedSnackbarComponent, {
            data: {type: addressType},
            duration: 2000,
        });
    }

    protected notifyError({message}) {
        this.snackBar.open(message, '', {
            panelClass: 'sf-snackbar-error',
            duration: 5000,
        })
    }
}

