import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatTable, MatTableDataSource } from '@angular/material';
import { OrdersService } from '../../core/services/orders.service';
import { Store as AppStore } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { Store } from '../../core/entities/store';
import { toPairs } from 'lodash';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { OrdersTableItem } from '../../core/entities/orders/orders-table-item';
import { Router } from '@angular/router';
import { OrdersFilter } from '../../core/entities/orders/orders-filter';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmShippingDialogComponent } from '../confirm-shipping-dialog/confirm-shipping-dialog.component';
import { debounceTime, filter, flatMap, take } from 'rxjs/operators';
import { OrderStatusChangedSnackbarComponent } from '../order-status-changed-snackbar/order-status-changed-snackbar.component';
import { OrderNotifyAction } from '../../core/entities/orders/order-notify-action.enum';
import { SelectOrdersDialogComponent } from '../select-orders-dialog/select-orders-dialog.component';
import { AssignTagsDialogComponent } from '../assign-tags-dialog/assign-tags-dialog.component';

const UPDATE_TABLE_ON_RESIZE_INTERVAL = 200;

@Component({
    selector: 'sf-orders-table',
    templateUrl: './orders-table.component.html',
    styleUrls: ['./orders-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersTableComponent implements OnInit, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatTable) ordersTable: MatTable<OrdersTableItem>;

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
    requiredColumns = ['checkbox', 'tags', 'hasErrors', 'marketplace', 'reference', 'status', 'total', 'date'];
    displayedColumns = this.requiredColumns;
    dataSource: MatTableDataSource<OrdersTableItem> = new MatTableDataSource();
    isLoadingResults = false;
    subscription: Subscription;
    fetchSubscription: Subscription;
    ordersFilter: OrdersFilter;
    exports: any[];
    showStickyBorder = false;
    resize$ = new Subject();

    constructor(protected appStore: AppStore<AppState>,
                protected ordersService: OrdersService,
                protected matDialog: MatDialog,
                protected changeDetectorRef: ChangeDetectorRef,
                protected ordersFilterService: OrdersFilterService,
                protected router: Router,
                protected snackbar: MatSnackBar,
                protected elementRef: ElementRef<HTMLElement>) {
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.resize$.next(event);
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
            .subscribe(([store, ordersFilter]) => {
                this.fetchData(store, ordersFilter);
            });

        this.paginator.page.subscribe(({pageIndex}) => {
            this.ordersFilterService.patchFilter('page', String(pageIndex + 1))
        });

        this.appStore.select('currentStore')
            .pipe(flatMap((store: Store) => this.ordersService.fetchExports(store.id)))
            .subscribe(response => this.exports = response._embedded.export);

        this.updateStickyColumnsStyles();
        this.resize$.pipe(
            debounceTime(UPDATE_TABLE_ON_RESIZE_INTERVAL)
        ).subscribe(() => this.updateStickyColumnsStyles());
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    manageTags() {
        if (!this.selection.selected.length) {
            this.matDialog.open(SelectOrdersDialogComponent, {data: 'assignTags'});
            return;
        }
        this.matDialog.open(AssignTagsDialogComponent, {
            data: {
                orders: this.selection.selected
            }
        }).afterClosed().subscribe(tagsChanged => {
            if (tagsChanged) {
                this.updateData();
            }
        })
    }

    setDisplayedColumns() {
        this.displayedColumns = this.requiredColumns
            .concat(toPairs(this.optionalColumns).reduce((acc, [key, isDisplayed]) => isDisplayed ? acc.concat(key) : acc, []));
        this.updateStickyColumnsStyles();

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

    showSelectOrdersDialog() {
        this.matDialog.open(SelectOrdersDialogComponent, {data: 'export'});
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
            flatMap((store: Store) => this.ordersService[action](
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

    protected fetchData(store: Store, ordersFilter: OrdersFilter) {
        this.isLoadingResults = true;
        this.ordersFilter = ordersFilter;
        this.changeDetectorRef.detectChanges();
        if (this.fetchSubscription && !this.fetchSubscription.closed) {
            this.fetchSubscription.unsubscribe();
        }
        this.fetchSubscription = this.ordersService.fetchOrdersList(store.id, ordersFilter)
            .subscribe(ordersPage => {
                this.selection.clear();
                this.isLoadingResults = false;

                this.resultsLength = ordersPage.total;
                this.paginator.pageIndex = +ordersFilter.page - 1;

                this.dataSource.data = ordersPage._embedded.order.map(order => OrdersTableItem.createFromOrder(order));
                this.updateStickyColumnsStyles();
            });

    }

    protected updateData() {
        this.appStore.select('currentStore').pipe(take(1))
            .subscribe(store => {
                this.fetchData(store, this.ordersFilter);
            })
    }

    protected updateStickyColumnsStyles() {
        this.changeDetectorRef.detectChanges();
        this.updateStickyBorder();
        this.ordersTable.updateStickyColumnStyles();
        this.changeDetectorRef.markForCheck();
    }

    protected updateStickyBorder() {
        const tableWidth = this.elementRef.nativeElement.querySelector('table.orders-table').getBoundingClientRect().width;
        const containerWidth = this.elementRef.nativeElement.querySelector('.table-scrollable').getBoundingClientRect().width;
        this.showStickyBorder = tableWidth > containerWidth;
    }
}
