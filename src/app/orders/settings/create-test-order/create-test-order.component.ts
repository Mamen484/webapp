import { Component, OnInit, ViewChild } from '@angular/core';
import { TestOrder } from '../../../core/entities/orders/test-order';
import { AppState } from '../../../core/entities/app-state';
import { Store } from '@ngrx/store';
import { OrdersService } from '../../../core/services/orders.service';
import { filter, flatMap, map, startWith, take } from 'rxjs/operators';
import { ValidationErrorsSnackbarComponent } from '../../../shared/validation-errors-snackbar/validation-errors-snackbar.component';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';
import { values } from 'lodash';
import { ErrorSnackbarConfig } from '../../../core/entities/error-snackbar-config';
import { Channel } from '../../../core/entities/channel';
import { combineLatest, Observable, zip } from 'rxjs';
import { StoreService } from '../../../core/services/store.service';
import { Store as UserStore } from '../../../core/entities/store';

@Component({
    selector: 'sf-create-test-order',
    templateUrl: './create-test-order.component.html',
    styleUrls: ['./create-test-order.component.scss']
})
export class CreateTestOrderComponent implements OnInit {

    @ViewChild(NgForm) form: NgForm;

    order = new TestOrder();
    totalPrice: number;
    /**
     * total products price without shipping
     */
    productsTotal: number;
    channelControl = new FormControl();
    filteredChannels: Channel[];
    filteredNewChannels: Channel[];
    paymentInputMode: 'custom' | 'predefined' = 'custom';
    channelMap = {amazon: 66, cdiscount: 111, monechelle: 259};

    constructor(protected appStore: Store<AppState>,
                protected ordersService: OrdersService,
                protected snackBar: MatSnackBar,
                protected router: Router,
                protected storeService: StoreService) {
    }

    ngOnInit() {
        this.addItem();
        this.updateTotalPrice();
        this.filterAutocompleteOptions();
    }

    addItem() {
        this.order.items.push(<any>{quantity: 1});
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
        this.productsTotal = this.calculateItemsPrice();
        this.totalPrice = this.productsTotal + Number(this.order.payment.shippingAmount || 0);
    }

    filterAutocompleteOptions() {
        combineLatest(
            this.channelControl.valueChanges.pipe(startWith('')),
            zip(this.getInstalledChannels(), this.fetchNewChannels()))
            .subscribe(([value, [channels, newChannels]]) => {
                this.filteredChannels = this.filterChannels(value, channels);
                this.filteredNewChannels = this.filterChannels(value, newChannels);
            });
    }

    channelDisplayFn(channel?: Channel) {
        return channel && channel.name;
    }

    reset() {
        // use setTimeout to prevent quantity field emptying
        setTimeout(() => {
            this.order = new TestOrder();
            this.addItem();
            this.updateTotalPrice();
        });
    }

    selectChannel({option}) {
        this.order.channelId = option.value.id;
        this.order.payment.method = '';
        this.paymentInputMode = values(this.channelMap).find(el => el === option.value.id)
            ? 'predefined'
            : 'custom';
    }

    setPaymentMethod(method: { value: string | 'custom' }) {
        if (method.value === 'custom') {
            this.paymentInputMode = 'custom';
            this.order.payment.method = '';
        } else {
            this.order.payment.method = method.value;
        }
    }

    protected calculateItemsPrice() {
        return this.order.items.reduce((acc, item) => +(item.price || 0) + acc, 0);
    }

    protected getInstalledChannels() {
        return this.appStore.select('installedChannels').pipe(
            filter(channels => Boolean(channels)),
            take(1));
    }

    protected fetchNewChannels(): Observable<Channel[]> {
        return this.appStore.select('currentStore').pipe(
            flatMap((store: UserStore) => this.storeService.getStoreChannels(store.id)),
            map(({_embedded}) => _embedded.channel.filter(({installed}) => !installed).map(({_embedded: {channel}}) => channel))
        );
    }

    protected filterChannels(value, channels: Channel[]) {
        const filterValue = typeof value === 'object' ? (<any>value).name.toLowerCase() : value.toLowerCase();
        return channels.filter(channel => channel.name.toLowerCase().includes(filterValue));
    }

}
