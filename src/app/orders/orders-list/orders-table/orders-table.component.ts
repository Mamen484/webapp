import { ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTable, PageEvent } from '@angular/material';
import { Store as AppStore } from '@ngrx/store';
import { Store } from 'sfl-shared/entities';
import { clone, toPairs } from 'lodash';
import { Observable, Subject, Subscription, zip } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { debounceTime, filter, flatMap, map, take, tap } from 'rxjs/operators';
import { SflLocaleIdService, SflLocalStorageService, SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { TableOperations } from 'sfl-shared/utils/table-operations';
import { ActivatedRoute } from '@angular/router';

import { OrdersTableItem } from '../../../core/entities/orders/orders-table-item';
import { OrdersFilter } from '../../../core/entities/orders/orders-filter';
import { AppState } from '../../../core/entities/app-state';
import { OrdersService } from '../../../core/services/orders.service';
import { OrdersView } from '../../../core/entities/orders/orders-view.enum';
import { ViewToPatchMap } from '../../../core/entities/orders/view-to-patch-map';
import { LocalStorageKey } from '../../../core/entities/local-storage-key.enum';
import { OrdersFilterDialogComponent } from '../../orders-filter-dialog/orders-filter-dialog.component';
import { SelectOrdersDialogComponent } from '../../select-orders-dialog/select-orders-dialog.component';
import { ConfirmCancellationDialogComponent } from '../../shared/confirm-cancellation-dialog/confirm-cancellation-dialog.component';
import { OrderNotifyAction } from '../../../core/entities/orders/order-notify-action.enum';
import { ConfirmShippingDialogComponent } from '../../confirm-shipping-dialog/confirm-shipping-dialog.component';
import { ConfirmDialogData } from '../../../core/entities/orders/confirm-dialog-data';
import { environment } from '../../../../environments/environment';
import { AssignTagsDialogComponent } from '../../assign-tags-dialog/assign-tags-dialog.component';
import { OrderStatusChangedSnackbarComponent } from '../../order-status-changed-snackbar/order-status-changed-snackbar.component';

const UPDATE_TABLE_ON_RESIZE_INTERVAL = 200;

@Component({
    selector: 'sf-orders-table',
    templateUrl: './orders-table.component.html',
    styleUrls: ['./orders-table.component.scss'],
})
export class OrdersTableComponent extends TableOperations<OrdersTableItem> implements OnInit, OnDestroy {

    @ViewChild(MatTable) ordersTable: MatTable<OrdersTableItem>;

    selection = new SelectionModel<OrdersTableItem>(true, []);
    optionalColumns = {
        updatedAt: false,
        services: false,
        productAmount: false,
        shippingAmount: false,
        paymentMethod: false,
        deliveryName: false,
        carrier: false,
        invoicingName: false,
        storeId: false,
        trackingNumber: false,
        imported: false,
    };
    requiredLeftColumns = ['checkbox', 'tags', 'hasErrors', 'marketplace', 'reference', 'status', 'total', 'date'];
    requiredRightColumns = ['invoice-link'];
    displayedColumns = this.requiredLeftColumns.concat(this.requiredRightColumns);
    subscription: Subscription;
    ordersFilter = new OrdersFilter({since: OrdersFilter.aMonthBefore()});
    exports: any[];
    showStickyBorder = false;
    resize$ = new Subject();
    selectedChannel;

    constructor(protected appStore: AppStore<AppState>,
                protected ordersService: OrdersService,
                protected matDialog: MatDialog,
                protected changeDetectorRef: ChangeDetectorRef,
                protected windowRef: SflWindowRefService,
                protected snackbar: MatSnackBar,
                protected elementRef: ElementRef<HTMLElement>,
                protected localStorage: SflLocalStorageService,
                protected localeIdService: SflLocaleIdService,
                protected route: ActivatedRoute,
                protected userService: SflUserService) {
        super();
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

    cancelFilter(filterName, filterValue) {
        this.isLoadingResults = true;
        this.ordersFilter[filterName] = filterValue;
        this.setSelectedChannel();
        this.fetchData();
    }

    goToOrder(orderId: string) {
        zip(this.userService.fetchAggregatedInfo(),
            this.appStore.select('currentStore').pipe(take(1)),
        ).subscribe(([userInfo, store]) => {
            let url = new URL((<Window>this.windowRef.nativeWindow).location.href);
            if (this.ordersFilter && this.ordersFilter.error) {
                url.searchParams.set('errorType', this.ordersFilter.error);
            }

            /* always specify a store explicitly to use a correct one
             * when a user switched between stores or an admin views a user's store
             */
            url.searchParams.set('store', String(store.id));

            const link = `${environment.BASE_HREF}/${this.localeIdService.localeId}/orders/detail/${orderId}${url.search}`;
            this.windowRef.nativeWindow.open(link);
        });

    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    ngOnInit() {
        this.setDefaultsFromStorage();

        this.appStore.select('currentStore')
            .pipe(flatMap((store: Store) => this.ordersService.fetchExports(store.id)))
            .subscribe(response => this.exports = response._embedded.export);

        this.updateStickyColumnsStyles();
        this.resize$.pipe(
            debounceTime(UPDATE_TABLE_ON_RESIZE_INTERVAL)
        ).subscribe(() => this.updateStickyColumnsStyles());

        super.ngOnInit();

        this.route.queryParams.subscribe(({view}) => {
            const currentView = view in OrdersView ? Number(view) : OrdersView.allOrders;
            // filter orders according to the chosen view
            Object.assign(this.ordersFilter, ViewToPatchMap[currentView]);
            this.isLoadingResults = true;
            this.currentPage = 0;
            this.fetchData();
        });
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
                this.rememberSelection();
                this.fetchData();
            }
        })
    }

    openDialog() {
        this.matDialog.open(OrdersFilterDialogComponent, {data: clone(this.ordersFilter)})
            .afterClosed()
            .subscribe(ordersFilter => {
                if (!ordersFilter) {
                    return;
                }
                this.ordersFilter = ordersFilter;
                this.isLoadingResults = true;
                this.currentPage = 0;
                this.setSelectedChannel();
                this.fetchData();
            });
    }

    pageChanged(event: PageEvent) {
        if (event.pageIndex === event.previousPageIndex) {
            this.localStorage.setItem(LocalStorageKey.ordersPageSize, event.pageSize.toString());
            this.pageSize = event.pageSize;
        } else {
            this.currentPage = event.pageIndex;
        }
        this.isLoadingResults = true;
        this.fetchData();
    }

    setDisplayedColumns() {
        this.displayedColumns = this.requiredLeftColumns
            .concat(toPairs(this.optionalColumns).reduce((acc, [key, isDisplayed]) => isDisplayed ? acc.concat(key) : acc, []))
            .concat(this.requiredRightColumns);
        this.localStorage.setItem(LocalStorageKey.ordersDisplayedColumns, this.displayedColumns.toString());
        this.updateStickyColumnsStyles();

    }

    // button actions

    openCancelDialog() {
        if (!this.selection.selected.length) {
            this.matDialog.open(SelectOrdersDialogComponent, {data: OrderNotifyAction.cancel});
            return;
        }
        this.matDialog.open(ConfirmCancellationDialogComponent, {data: this.getConfirmDialogData()})
            .afterClosed()
            .pipe(
                filter(confirmed => confirmed),
                flatMap(() => this.notifyStatusChange(OrderNotifyAction.cancel)),
            )
            .subscribe(() => this.showStatusChangedSnackbar(OrderNotifyAction.cancel));
    }

    openShippingDialog() {
        if (!this.selection.selected.length) {
            this.matDialog.open(SelectOrdersDialogComponent, {data: OrderNotifyAction.ship});
            return;
        }
        this.matDialog.open(ConfirmShippingDialogComponent, {data: this.getConfirmDialogData()})
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
        if (action === OrderNotifyAction.cancel) {
            this.openCancelDialog();
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

    protected getConfirmDialogData(): ConfirmDialogData {
        return {
            ordersNumber: this.selection.selected.length,
            orderReference: this.selection.selected.length === 1 ? this.selection.selected[0].reference : undefined,
        }
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

    protected fetchCollection(params: { limit: number, page: number, search: string }): Observable<{ total: number; dataList: any[] }> {
        this.ordersFilter.page = String(params.page);
        this.ordersFilter.search = params.search;
        this.ordersFilter.limit = String(params.limit);
        return this.ordersService.fetchOrdersList(this.ordersFilter).pipe(
            map(ordersPage => ({
                total: ordersPage.total,
                dataList: ordersPage._embedded.order.map(order => OrdersTableItem.createFromOrder(order))
            })),
            tap(ordersPage => this.selection.clear()));
    }

    protected afterApplyingData() {
        super.afterApplyingData();
        this.restoreSelection();
        this.updateStickyColumnsStyles();
    }


    protected rememberSelection() {
        if (!this.selection.selected.length) {
            return;
        }
        this.localStorage.setItem(LocalStorageKey.ordersSelection, JSON.stringify(this.selection.selected.map(order => order.id)));
    }

    protected restoreSelection() {
        const memory: string = this.localStorage.getItem(LocalStorageKey.ordersSelection);
        if (!memory) {
            return;
        }
        const selection: number[] = JSON.parse(memory);
        this.selection.select(...this.dataSource.data.filter(item => selection.indexOf(item.id) !== -1));
        this.localStorage.removeItem(LocalStorageKey.ordersSelection);
    }

    protected setDefaultsFromStorage() {
        const pageSize = this.localStorage.getItem(LocalStorageKey.ordersPageSize);
        if (pageSize) {
            this.pageSize = pageSize;
        }

        const savedColumns = this.localStorage.getItem(LocalStorageKey.ordersDisplayedColumns);
        if (savedColumns && savedColumns.length) {
            savedColumns.split(',').forEach(column => {
                if (typeof this.optionalColumns[column] !== 'undefined') {
                    this.optionalColumns[column] = true;
                }
            });
        }

        this.setDisplayedColumns();
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

    protected setSelectedChannel() {
        this.appStore.select('installedChannels').pipe(take(1)).subscribe(channels => {
            try {
                this.selectedChannel = this.ordersFilter.channel
                    ? channels.find(ch => ch.id === this.ordersFilter.channel).name
                    : undefined;
            } catch (e) {
                this.selectedChannel = undefined;
            }
        });
    }
}
