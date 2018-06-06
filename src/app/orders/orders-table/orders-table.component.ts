import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LabelsDialogComponent } from '../labels-dialog/labels-dialog.component';
import { MatDialog, MatPaginator, MatSnackBar, MatTableDataSource } from '@angular/material';
import { OrdersService } from '../../core/services/orders.service';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { Order } from '../../core/entities/orders/order';
import { Store } from '../../core/entities/store';
import { toPairs } from 'lodash';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { combineLatest, Subscription } from 'rxjs';
import { OrdersTableItem } from '../../core/entities/orders/orders-table-item';
import { Router } from '@angular/router';
import { OrdersFilter } from '../../core/entities/orders/orders-filter';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmShippingDialogComponent } from '../confirm-shipping-dialog/confirm-shipping-dialog.component';
import { filter, flatMap } from 'rxjs/operators';
import { OrderStatusChangedSnackbarComponent } from '../order-status-changed-snackbar/order-status-changed-snackbar.component';
import { OrderNotifyAction } from '../../core/entities/orders/order-notify-action.enum';
import { SelectOrdersDialogComponent } from '../select-orders-dialog/select-orders-dialog.component';

@Component({
    selector: 'sf-orders-table',
    templateUrl: './orders-table.component.html',
    styleUrls: ['./orders-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersTableComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    selection = new SelectionModel<OrdersTableItem>(true, []);

    resultsLength = 0;

    optionalColumns = {
        updatedAt: false,
        productAmount: false,
        shippingAmount: false,
        paymentMethod: false,
        deliveryName: false,
        invoicingName: false,
        storeId: false,
        trackingNumber: false,
        imported: false,
    };
    requiredColumns = ['checkbox', 'hasErrors', 'marketplace', 'reference', 'status', 'total', 'date'];
    displayedColumns = this.requiredColumns;
    dataSource: MatTableDataSource<OrdersTableItem> = new MatTableDataSource();
    isLoadingResults = false;
    subscription: Subscription;
    fetchSubscription: Subscription;
    ordersFilter: OrdersFilter;

    constructor(protected appStore: AppStore<AppState>,
                protected ordersService: OrdersService,
                protected matDialog: MatDialog,
                protected changeDetectorRef: ChangeDetectorRef,
                protected ordersFilterService: OrdersFilterService,
                protected router: Router,
                protected snackbar: MatSnackBar) {
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    goToOrder(orderId: string) {
        this.router.navigate(['orders', 'detail', orderId]);
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    ngOnInit() {
        this.subscription = combineLatest(this.appStore.select('currentStore'), this.ordersFilterService.getFilter())
            .subscribe(([store, filter]) => {
                this.selection.clear();
                this.fetchData(store, filter);
            });

        this.paginator.page.subscribe(({pageIndex}) => {
            this.ordersFilterService.patchFilter('page', String(pageIndex + 1))
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    // tags/labels functionality is planned for next releases
    addLabel() {
        this.matDialog.open(LabelsDialogComponent);
    }

    setDisplayedColumns() {
        this.displayedColumns = this.requiredColumns
            .concat(toPairs(this.optionalColumns).reduce((acc, [key, isDisplayed]) => isDisplayed ? acc.concat(key) : acc, []));

    }

    // button actions

    openShippingDialog() {
        if (!this.selection.selected.length) {
            this.matDialog.open(SelectOrdersDialogComponent, {data: OrderNotifyAction.ship});
            return;
        }
        this.matDialog.open(ConfirmShippingDialogComponent)
            .afterClosed()
            .pipe(
                filter(shippingConfirmed => shippingConfirmed),
                flatMap(() => this.notifyStatusChange(OrderNotifyAction.ship)),
            )
            .subscribe(() => this.showStatusChangedSnackbar(OrderNotifyAction.ship));
    }

    applyStatusAction(action: OrderNotifyAction) {
        if (action === OrderNotifyAction.ship) {
            this.openShippingDialog();
            return;
        }
        this.changeStatusForSelectedOrders(action);
    }


    protected changeStatusForSelectedOrders(action: OrderNotifyAction) {
        if (!this.selection.selected.length) {
            this.matDialog.open(SelectOrdersDialogComponent, {data: action});
            return;
        }
        this.notifyStatusChange(action)
            .subscribe(() => this.showStatusChangedSnackbar(action));
    }

    protected notifyStatusChange(action) {
        return this.appStore.select('currentStore').pipe(
            flatMap(store => this.ordersService[action](
                store.id,
                this.selection.selected.map(order => ({reference: order.reference, channelName: order.channelName})
                )))
        )
    }

    protected showStatusChangedSnackbar(action) {
        this.snackbar.openFromComponent(OrderStatusChangedSnackbarComponent, {
            duration: 2000,
            data: {ordersNumber: this.selection.selected.length, action}
        });
    }

    protected fetchData(store: Store, filter: OrdersFilter) {
        this.isLoadingResults = true;
        this.ordersFilter = filter;
        this.changeDetectorRef.detectChanges();
        if (this.fetchSubscription && !this.fetchSubscription.closed) {
            this.fetchSubscription.unsubscribe();
        }
        this.fetchSubscription = this.ordersService.fetchOrdersList(store.id, filter)
            .subscribe(ordersPage => {
                this.isLoadingResults = false;

                this.resultsLength = ordersPage.total;
                this.paginator.pageIndex = +filter.page - 1;

                this.dataSource.data = ordersPage._embedded.order.map(order => this.formatOrder(order));
                this.changeDetectorRef.markForCheck();
            });

    }

    protected formatOrder(order: Order) {
        return <OrdersTableItem>{
            hasErrors: Boolean(order.errors && order.errors.length),
            channelImage: order._embedded.channel._links.image.href,
            channelName: order._embedded.channel.name,
            reference: order.reference,
            id: order.id,
            status: order.status,
            total: order.payment.totalAmount,
            currency: order.payment.currency,
            date: new Date(order.createdAt).getTime(),
            updatedAt: order.updatedAt ? new Date(order.updatedAt).getTime() : undefined,
            productAmount: order.payment.productAmount,
            shippingAmount: order.payment.shippingAmount,
            paymentMethod: order.payment.method,
            deliveryName: order.shippingAddress.firstName + ' ' + order.shippingAddress.lastName,
            invoicingName: order.billingAddress.firstName + ' ' + order.billingAddress.lastName,
            storeId: order.storeReference,
            trackingNumber: order.shipment.trackingNumber,
            imported: Boolean(order.acknowledgedAt),
        }
    }
}
