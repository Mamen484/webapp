import { Component, OnInit, ViewChild } from '@angular/core';
import { TestOrder } from '../../../core/entities/orders/test-order';
import { AppState } from '../../../core/entities/app-state';
import { select, Store } from '@ngrx/store';
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

@Component({
    selector: 'sf-create-test-order',
    templateUrl: './create-test-order.component.html',
    styleUrls: ['./create-test-order.component.scss']
})
export class CreateTestOrderComponent implements OnInit {

    @ViewChild(NgForm) form: NgForm;

    order = new TestOrder();
    totalPrice: number;
    channelControl = new FormControl();
    filteredChannels: Channel[];
    filteredNewChannels: Channel[];

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

    selectChannel({option}) {
        this.order.channel = option.value.id;
    }

    protected calculateItemsPrice() {
        return this.order.items.reduce((acc, item) => +(item.price || 0) + acc, 0);
    }

    protected getInstalledChannels() {
        return this.appStore.pipe(
            select('installedChannels'),
            filter(channels => Boolean(channels)),
            take(1));
    }

    protected fetchNewChannels(): Observable<Channel[]> {
        return this.appStore.pipe(
            select('currentStore'),
            flatMap(store => this.storeService.getStoreChannels(store.id)),
            map(({_embedded}) => _embedded.channel.filter(({installed}) => !installed).map(({_embedded: {channel}}) => channel))
        );
    }

    protected filterChannels(value, channels: Channel[]) {
        const filterValue = typeof value === 'object' ? (<any>value).name.toLowerCase() : value.toLowerCase();
        return channels.filter(channel => channel.name.toLowerCase().includes(filterValue));
    }

}
