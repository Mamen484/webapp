import { Component, OnInit, ViewChild } from '@angular/core';
import { TestOrder } from '../../../core/entities/orders/test-order';
import { AppState } from '../../../core/entities/app-state';
import { select, Store } from '@ngrx/store';
import { StoreChannelDetails } from '../../../core/entities/store-channel-details';
import { OrdersService } from '../../../core/services/orders.service';
import { filter, take } from 'rxjs/operators';
import { ValidationErrorsSnackbarComponent } from '../../../shared/validation-errors-snackbar/validation-errors-snackbar.component';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { values } from 'lodash';
import { ErrorSnackbarConfig } from '../../../core/entities/error-snackbar-config';

@Component({
    selector: 'sf-create-test-order',
    templateUrl: './create-test-order.component.html',
    styleUrls: ['./create-test-order.component.scss']
})
export class CreateTestOrderComponent implements OnInit {

    @ViewChild(NgForm) form: NgForm;

    order = new TestOrder();
    channels: StoreChannelDetails[];
    totalPrice: number;

    constructor(protected appStore: Store<AppState>,
                protected ordersService: OrdersService,
                protected snackBar: MatSnackBar,
                protected router: Router) {
    }

    ngOnInit() {
        this.addItem();
        this.appStore.pipe(
            select('installedChannels'),
            filter(channels => Boolean(channels)),
            take(1))
            .subscribe(channels => this.channels = channels);
        this.updateTotalPrice();
    }

    addItem() {
        this.order.items.push(<any>{});
    }

    removeItem(index) {
        this.order.items.splice(index, 1);
    }

    create() {
        if (!this.form.valid) {
            values(this.form.controls).forEach(control => control.markAsDirty());
            this.snackBar.openFromComponent(ValidationErrorsSnackbarComponent, new ErrorSnackbarConfig());
            return;
        }
        this.ordersService.create(this.order).subscribe(() => this.router.navigate(['/orders']));
    }

    updateTotalPrice() {
        this.totalPrice = this.calculateItemsPrice() + Number(this.order.shipment.shippingAmount || 0);
    }

    protected calculateItemsPrice() {
        return this.order.items.reduce((acc, item) => +(item.price || 0) + acc, 0);
    }

}
