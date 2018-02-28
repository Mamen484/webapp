import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LabelsDialogComponent } from '../labels-dialog/labels-dialog.component';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { OrdersService } from '../../core/services/orders.service';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { Order } from '../../core/entities/orders/order';
import { Store } from '../../core/entities/store';
import { toPairs } from 'lodash';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { Subscription } from 'rxjs/Subscription';
import { OrdersTableItem } from '../../core/entities/orders/orders-table-item';
import { Router } from '@angular/router';
import { LoadingFlagService } from '../../core/services/loading-flag.service';
import { OrdersFilter } from '../../core/entities/orders-filter';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';
import { OrderAcknowledgement } from '../../core/entities/orders/order-acknowledgement.enum';

@Component({
    selector: 'sf-orders-table',
    templateUrl: './orders-table.component.html',
    styleUrls: ['./orders-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersTableComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;

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
    orderStatus = OrderStatus;
    errorType = OrderErrorType;
    isLoadingResults = false;
    subscription: Subscription;
    fetchSubscription: Subscription;
    ordersFilter: OrdersFilter;
    acknowledgement = OrderAcknowledgement;

    constructor(protected appStore: AppStore<AppState>,
                protected ordersService: OrdersService,
                protected matDialog: MatDialog,
                protected changeDetectorRef: ChangeDetectorRef,
                protected ordersFilterService: OrdersFilterService,
                protected router: Router,
                protected loadingFlagService: LoadingFlagService) {
    }

    goToOrder(orderId: string) {
        this.loadingFlagService.triggerLoadingStarted();
        this.router.navigate(['orders', 'detail', orderId])
            .then(() => this.loadingFlagService.triggerLoadedFinished());
    }

    ngOnInit() {
        this.subscription = this.appStore.select('currentStore')
            .combineLatest(this.ordersFilterService.getFilter())
            .subscribe(([store, filter]) => this.fetchData(store, filter));

        this.paginator.page.subscribe(({pageIndex}) => {
            this.ordersFilterService.patchFilter('page', String(pageIndex + 1))
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    addLabel() {
        this.matDialog.open(LabelsDialogComponent);
    }

    setDisplayedColumns() {
        this.displayedColumns = this.requiredColumns
            .concat(toPairs(this.optionalColumns).reduce((acc, [key, isDisplayed]) => isDisplayed ? acc.concat(key) : acc, []));

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
            reference: order.reference,
            id: order.id,
            status: order.status,
            total: order.payment.feedAmount,
            date: new Date(order.createdAt).getTime(),
            updatedAt: order.updatedAt ? new Date(order.updatedAt).getTime() : undefined,
            productAmount: order.payment.productAmount,
            shippingAmount: order.payment.shippingAmount,
            paymentMethod: order.payment.method,
            deliveryName: order.shippingAddress.firstName + ' ' + order.shippingAddress.lastName,
            invoicingName: order.billingAddress.firstName + ' ' + order.billingAddress.lastName,
            storeId: order.storeReference,
            trackingNumber: order.shipment.trackingNumber,
            imported: Boolean(order.storeReference),
        }
    }
}
