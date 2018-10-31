import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../core/entities/orders/order';
import { cloneDeep } from 'lodash';
import { Store as UserStore } from 'sfl-shared/src/lib/core/entities';
import { flatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { OrdersService } from '../../../core/services/orders.service';
import { MatSnackBar } from '@angular/material';
import { AddressSavedSnackbarComponent, AddressType } from '../address-saved-snackbar/address-saved-snackbar.component';
import { Observable } from 'rxjs';
import { ErrorSnackbarConfig } from '../../../core/entities/error-snackbar-config';
import { ValidationErrorsSnackbarComponent } from '../../../shared/validation-errors-snackbar/validation-errors-snackbar.component';

@Component({
    selector: 'sf-addresses',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {

    @Input() order: Order;
    orderCopy: Order;
    validationMessages;

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
        this.saveAddress((store) => this.ordersService.modifyBillingAddress(
            store.id,
            this.orderCopy.id,
            this.orderCopy.billingAddress), AddressType.billingAddress);
    }


    saveShippingAddress() {
        this.saveAddress((store) => this.ordersService.modifyShippingAddress(
            store.id,
            this.orderCopy.id,
            this.orderCopy.shippingAddress), AddressType.shippingAddress);
    }

    protected saveAddress(updateRequest: (store: UserStore) => Observable<any>, addressType: AddressType) {
        this.appStore.select('currentStore').pipe(
            flatMap((store: UserStore) => updateRequest(store)))
            .subscribe(
                () => {
                    this.order[addressType] = cloneDeep(this.orderCopy[addressType]);
                    this.notifySuccess(addressType)
                },
                error => {
                    this.validationMessages = error.error.validationMessages;
                    this.notifyError(error);
                }
            );
    }

    protected notifySuccess(addressType) {
        this.snackBar.openFromComponent(AddressSavedSnackbarComponent, {
            data: {type: addressType},
            duration: 2000,
        });
    }

    protected notifyError({message}) {
        if (this.validationMessages) {
            this.snackBar.openFromComponent(ValidationErrorsSnackbarComponent, new ErrorSnackbarConfig());
        } else {
            this.snackBar.open(message, '', new ErrorSnackbarConfig());
        }
    }
}

