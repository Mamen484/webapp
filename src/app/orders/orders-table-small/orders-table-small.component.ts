import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { Store } from '../../core/entities/store';
import { MatTableDataSource } from '@angular/material';
import { OrdersTableItem } from '../../core/entities/orders/orders-table-item';
import { OrdersFilter } from '../../core/entities/orders-filter';
import { Order } from '../../core/entities/orders/order';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { OrdersService } from '../../core/services/orders.service';
import { LoadingFlagService } from '../../core/services/loading-flag.service';

@Component({
    selector: 'sf-orders-table-small',
    templateUrl: './orders-table-small.component.html',
    styleUrls: ['./orders-table-small.component.scss']
})
export class OrdersTableSmallComponent implements OnInit, OnDestroy {

    resultsLength = 0;
    displayedColumns = ['marketplace', 'total', 'date'];
    dataSource: MatTableDataSource<OrdersTableItem> = new MatTableDataSource();
    isLoadingResults = false;
    subscription: Subscription;
    fetchSubscription: Subscription;
    ordersFilter: OrdersFilter;

    constructor(protected appStore: AppStore<AppState>,
                protected ordersService: OrdersService,
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
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
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
                this.dataSource.data = ordersPage._embedded.order.map(order => this.formatOrder(order));
                this.changeDetectorRef.markForCheck();
            });

    }

    protected formatOrder(order: Order) {
        return <OrdersTableItem>{
            channelImage: order._embedded.channel._links.image.href,
            total: order.payment.feedAmount,
            date: new Date(order.createdAt).getTime(),
        }

    }
}
