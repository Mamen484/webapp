import { cloneDeep } from 'lodash';
import { OrdersTableComponent } from './orders-table.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { OrdersService } from '../../core/services/orders.service';
import { MatDialog, MatMenuModule, MatSnackBar, MatTableModule } from '@angular/material';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { Order } from '../../core/entities/orders/order';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { OrdersFilter } from '../../core/entities/orders/orders-filter';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';
import { Router } from '@angular/router';
import { OrdersTableItem } from '../../core/entities/orders/orders-table-item';
import { ConfirmShippingDialogComponent } from '../confirm-shipping-dialog/confirm-shipping-dialog.component';
import { OrderStatusChangedSnackbarComponent } from '../order-status-changed-snackbar/order-status-changed-snackbar.component';
import { SelectOrdersDialogComponent } from '../select-orders-dialog/select-orders-dialog.component';
import { OrderNotifyAction } from '../../core/entities/orders/order-notify-action.enum';
import { InvoicesLinkPipe } from '../../shared/invoices-link/invoices-link.pipe';
import { OrdersExportLinkPipe } from '../../shared/orders-export-link/orders-export-link.pipe';
import { SflLocalStorageService } from 'sfl-shared';
import { BlankPipe } from '../order-details/items-table/items-table.component.spec';
import { ConfirmCancellationDialogComponent } from '../shared/confirm-cancellation-dialog/confirm-cancellation-dialog.component';
import { LocalStorageKey } from '../../core/entities/local-storage-key.enum';
import { ChannelMap } from '../../core/entities/channel-map.enum';

describe('OrdersTableComponent', () => {
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let matDialog: jasmine.SpyObj<MatDialog>;
    let cdr: jasmine.SpyObj<ChangeDetectorRef>;
    let filterService: jasmine.SpyObj<OrdersFilterService>;
    let router: jasmine.SpyObj<Router>;
    let snackbar: jasmine.SpyObj<MatSnackBar>;

    let component: OrdersTableComponent;
    let fixture: ComponentFixture<OrdersTableComponent>;
    let localStorage: jasmine.SpyObj<SflLocalStorageService>;

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj(['select', 'pipe']);
        ordersService = jasmine.createSpyObj(['fetchOrdersList', 'acknowledge', 'ship', 'refuse', 'cancel', 'accept', 'unacknowledge', 'fetchExports']);
        matDialog = jasmine.createSpyObj(['open']);
        cdr = jasmine.createSpyObj(['detectChanges', 'markForCheck']);
        filterService = jasmine.createSpyObj(['getFilter', 'patchFilter']);
        router = jasmine.createSpyObj(['navigate']);
        snackbar = jasmine.createSpyObj(['openFromComponent']);
        localStorage = jasmine.createSpyObj(['getItem', 'setItem', 'removeItem']);

        TestBed.configureTestingModule({
            declarations: [
                OrdersTableComponent,
                SfCurrencyPipe,
                InvoicesLinkPipe,
                OrdersExportLinkPipe,
            ],
            schemas: [
                NO_ERRORS_SCHEMA,
            ],
            providers: [
                {provide: Store, useValue: appStore},
                {provide: OrdersService, useValue: ordersService},
                {provide: MatDialog, useValue: matDialog},
                {provide: ChangeDetectorRef, useValue: cdr},
                {provide: OrdersFilterService, useValue: filterService},
                {provide: Router, useValue: router},
                {provide: MatSnackBar, useValue: snackbar},
                {provide: SflLocalStorageService, useValue: localStorage},

            ],
            imports: [
                MatTableModule,
                MatMenuModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrdersTableComponent);
        component = fixture.componentInstance;
        component.paginator = <any>({page: EMPTY, pageIndex: 0});
        ordersService.fetchExports.and.returnValue(EMPTY);
    });

    it('should assign exports on init', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        ordersService.fetchOrdersList.and.returnValue(EMPTY);
        ordersService.fetchExports.and.returnValue(of({
            _embedded: {
                'export': [
                    {id: 1, name: 'one'},
                    {id: 2, name: 'two'},
                ]
            }
        }));
        fixture.detectChanges();
        expect(component.exports.length).toEqual(2);
        expect(component.exports[0].id).toEqual(1);
        expect(component.exports[0].name).toEqual('one');
        expect(component.exports[1].id).toEqual(2);
        expect(component.exports[1].name).toEqual('two');
    });

    it('should display a loading spinner while data is being loaded', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        ordersService.fetchOrdersList.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(component.isLoadingResults).toEqual(true);
    });

    it('should hide a loading spinner while data is loaded', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        ordersService.fetchOrdersList.and.returnValue(of({_embedded: {order: []}}));
        fixture.detectChanges();
        expect(component.isLoadingResults).toBe(false);
    });

    it('should format order data properly', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        ordersService.fetchOrdersList.and.returnValue(of(mockOrder()));
        fixture.detectChanges();
        let data = component.dataSource.data[0];
        expect(data.hasErrors).toBe(false);
        expect(data.channelImage).toBe('image link');
        expect(data.reference).toBe('ref');
        expect(data.id).toBe(21);
        expect(data.status).toBe('created');
        expect(data.total).toBe(22);
        expect(data.date).toBe(1515417927773);
        expect(data.updatedAt).not.toBeDefined();
        expect(data.productAmount).toBe(12);
        expect(data.shippingAmount).toBe(10);
        expect(data.paymentMethod).toBe('some method');
        expect(data.deliveryName).toBe('name1 surname1');
        expect(data.invoicingName).toBe('name2 surname2');
        expect(data.storeId).toBe('some reference');
        expect(data.trackingNumber).toBe('some tracking number');
        expect(data.imported).toBe(true);
    });

    it('should have paymentIsAfn service if the channel is amazon and payment.method is AFN', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        const order = mockOrder();
        order._embedded.order[0]._embedded.channel.id = ChannelMap.amazon;
        order._embedded.order[0].payment.method = 'AFN';
        ordersService.fetchOrdersList.and.returnValue(of(order));
        fixture.detectChanges();
        let data = component.dataSource.data[0];
        expect(data.services.paymentIsAfn).toBe(true);
        expect(data.services.paymentIsClogistique).toBe(false);
        expect(data.services.shippedByManomano).toBe(false);
        expect(data.services.isAmazonPrime).toBe(false);
    });

    it('should have paymentIsClogistique service if the channel is Cdiscount and payment.method is Clogistique', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        const order = mockOrder();
        order._embedded.order[0]._embedded.channel.id = ChannelMap.cdiscount;
        order._embedded.order[0].payment.method = 'Clogistique';
        ordersService.fetchOrdersList.and.returnValue(of(order));
        fixture.detectChanges();
        let data = component.dataSource.data[0];
        expect(data.services.paymentIsAfn).toBe(false);
        expect(data.services.paymentIsClogistique).toBe(true);
        expect(data.services.shippedByManomano).toBe(false);
        expect(data.services.isAmazonPrime).toBe(false);
    });

    it('should have shippedByManomano service if the channel is Manomano and there is additional field env = EPMM', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        const order = mockOrder();
        order._embedded.order[0]._embedded.channel.id = ChannelMap.manomano;
        order._embedded.order[0].additionalFields = {env: 'EPMM'};
        ordersService.fetchOrdersList.and.returnValue(of(order));
        fixture.detectChanges();
        let data = component.dataSource.data[0];
        expect(data.services.paymentIsAfn).toBe(false);
        expect(data.services.paymentIsClogistique).toBe(false);
        expect(data.services.shippedByManomano).toBe(true);
        expect(data.services.isAmazonPrime).toBe(false);
    });

    it('should have isAmazonPrime service if the channel is Amazon and there is additional field is_prime = true', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        const order = mockOrder();
        order._embedded.order[0]._embedded.channel.id = ChannelMap.amazon;
        order._embedded.order[0].additionalFields = {is_prime: true};
        ordersService.fetchOrdersList.and.returnValue(of(order));
        fixture.detectChanges();
        let data = component.dataSource.data[0];
        expect(data.services.paymentIsAfn).toBe(false);
        expect(data.services.paymentIsClogistique).toBe(false);
        expect(data.services.shippedByManomano).toBe(false);
        expect(data.services.isAmazonPrime).toBe(true);
    });

    it('should have multiple services if available', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        const order = mockOrder();
        order._embedded.order[0]._embedded.channel.id = ChannelMap.amazon;
        order._embedded.order[0].additionalFields = {is_prime: true};
        order._embedded.order[0].payment.method = 'AFN';

        ordersService.fetchOrdersList.and.returnValue(of(order));
        fixture.detectChanges();
        let data = component.dataSource.data[0];
        expect(data.services.paymentIsAfn).toBe(true);
        expect(data.services.paymentIsClogistique).toBe(false);
        expect(data.services.shippedByManomano).toBe(false);
        expect(data.services.isAmazonPrime).toBe(true);
    });

    it('should set `imported` property to `true` when the storeReference is defined', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        let order = mockOrder();
        order._embedded.order[0].storeReference = '121';
        ordersService.fetchOrdersList.and.returnValue(of(order));
        fixture.detectChanges();
        expect(component.dataSource.data[0].imported).toEqual(true);
    });

    it('should set `imported` property to `false` when the acknowledgedAt is NOT defined', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        let order = mockOrder();
        order._embedded.order[0].acknowledgedAt = undefined;
        ordersService.fetchOrdersList.and.returnValue(of(order));
        fixture.detectChanges();
        expect(component.dataSource.data[0].imported).toEqual(false);
    });

    it('should perform only 1 fetchOrdersList call on initialization', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        ordersService.fetchOrdersList.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(ordersService.fetchOrdersList).toHaveBeenCalledTimes(1);
    });

    it('should redraw the table when filter data changes', () => {
        let filter$ = new BehaviorSubject(new OrdersFilter());
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(filter$.asObservable());
        ordersService.fetchOrdersList.and.returnValue(EMPTY);
        fixture.detectChanges();
        expect(ordersService.fetchOrdersList).toHaveBeenCalledTimes(1);

        // emit a new filter value
        let filter = new OrdersFilter();
        filter.status = OrderStatus.shipped;
        filter.tag = 'l';
        filter$.next(filter);
        expect(ordersService.fetchOrdersList).toHaveBeenCalledTimes(2);
        expect(ordersService.fetchOrdersList.calls.mostRecent().args[0]).toEqual(filter);
    });

    it('should clear selection when filter data changes', () => {
        let filter$ = new BehaviorSubject(new OrdersFilter());
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(filter$.asObservable());
        const order = mockOrder();
        ordersService.fetchOrdersList.and.returnValue(of(order));
        fixture.detectChanges();
        component.selection.select(component.dataSource.data[0]);
        expect(component.selection.selected.length).toEqual(1);

        // emit a new filter value
        let filter = new OrdersFilter();
        filter.status = OrderStatus.shipped;
        filter.tag = 'l';
        filter$.next(filter);
        expect(component.selection.selected.length).toEqual(0);
    });

    it('should keep selection when tags assigned', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of(new OrdersFilter()));
        matDialog.open.and.returnValue({afterClosed: () => of(true)});
        localStorage.getItem.and.callFake(key => key === LocalStorageKey.ordersSelection ? '[2,4]' : undefined);
        const order = mockOrder();
        order._embedded.order.push(
            cloneDeep(order._embedded.order[0]),
            cloneDeep(order._embedded.order[0]),
            cloneDeep(order._embedded.order[0])
        );
        order._embedded.order[0].id = 1;
        order._embedded.order[1].id = 2;
        order._embedded.order[2].id = 3;
        order._embedded.order[3].id = 4;
        ordersService.fetchOrdersList.and.returnValue(of(order));
        fixture.detectChanges();
        component.selection.select(component.dataSource.data[1]);
        component.selection.select(component.dataSource.data[3]);
        component.manageTags();
        expect(component.selection.selected.length).toEqual(2);
        expect(component.selection.selected[0].id).toEqual(2);
        expect(component.selection.selected[1].id).toEqual(4);
        expect(localStorage.removeItem).toHaveBeenCalledWith(LocalStorageKey.ordersSelection);
    });

    it('should store selection into a local storage when tags assigned', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of(new OrdersFilter()));
        matDialog.open.and.returnValue({afterClosed: () => of(true)});
        const order = mockOrder();
        ordersService.fetchOrdersList.and.returnValue(of(order));
        fixture.detectChanges();
        component.selection.select(component.dataSource.data[0]);
        component.manageTags();
        expect(localStorage.setItem).toHaveBeenCalledWith(LocalStorageKey.ordersSelection, '[21]');
    });

    it('should remember selection before navigation to the order details', () => {
        component.selection = <any>{selected: [{id: 23}, {id: 91}]};
        component.goToOrder('12');
        expect(localStorage.setItem).toHaveBeenCalledWith(LocalStorageKey.ordersSelection, '[23,91]');
    });

    it('should set `hasErrors` to FALSE if errors array is empty', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        let order = mockOrder();
        order._embedded.order[0].errors = [];
        ordersService.fetchOrdersList.and.returnValue(of(order));
        fixture.detectChanges();
        expect(component.dataSource.data[0].hasErrors).toEqual(false);
    });

    it('should set `hasErrors` to TRUE if errors array is NOT empty', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        let order = mockOrder();
        order._embedded.order[0].errors = [{type: OrderErrorType.ship, message: 'some message', occuredAt: 'date'}];
        ordersService.fetchOrdersList.and.returnValue(of(order));
        fixture.detectChanges();
        expect(component.dataSource.data[0].hasErrors).toEqual(true);
    });

    [
        OrderNotifyAction.acknowledge,
        OrderNotifyAction.unacknowledge,
        OrderNotifyAction.accept,
        OrderNotifyAction.refuse,
    ].forEach(action => {
        it(`should ${action} selected orders on click the ${action} button`, () => {
            checkChangeStatusRequestSent(action);
        });

        it(`should open 'select orders' dialog on click on ${action} button when no orders selected`, () => {
            component.applyStatusAction(action);
            expect(matDialog.open.calls.mostRecent().args[0]).toEqual(SelectOrdersDialogComponent);
            expect(matDialog.open.calls.mostRecent().args[1].data).toEqual(action);
        });
    });


    it('should ship selected orders on click the `cancel` button', () => {
        matDialog.open.and.returnValue({afterClosed: () => of(true)});
        checkChangeStatusRequestSent('cancel');
    });

    it('should open confirm cancellation dialog on click on `cancel` button', () => {
        component.selection.selected.length = 2;
        matDialog.open.and.returnValue({afterClosed: () => EMPTY});
        component.openCancelDialog();
        expect(matDialog.open).toHaveBeenCalledWith(ConfirmCancellationDialogComponent, {data: {ordersNumber: 2, orderReference: undefined}});
    });

    it('should NOT open confirm cancellation dialog on click on `cancel` button when no orders selected', () => {
        component.openCancelDialog();
        expect(matDialog.open).not.toHaveBeenCalledWith(ConfirmCancellationDialogComponent, {data: 0});
    });

    it('should open `select orders` dialog on click on `cancel` button when no orders selected', () => {
        component.openCancelDialog();
        expect(matDialog.open.calls.mostRecent().args[0]).toEqual(SelectOrdersDialogComponent);
        expect(matDialog.open.calls.mostRecent().args[1].data).toEqual(OrderNotifyAction.cancel);
    });

    it('should open snackbar if cancellation is confirmed', () => {
        component.selection.selected.length = 2;
        matDialog.open.and.returnValue({afterClosed: () => of(true)});
        appStore.select.and.returnValue(of({id: 22}));
        ordersService.cancel.and.returnValue(of({reference: 'some reference', channelName: 'some name'}))
        component.openCancelDialog();
        expect(snackbar.openFromComponent).toHaveBeenCalledTimes(1);
        expect(snackbar.openFromComponent.calls.mostRecent().args[0]).toEqual(OrderStatusChangedSnackbarComponent);
    });

    it('should NOT open snackbar if cancellation is cancelled', () => {
        matDialog.open.and.returnValue({afterClosed: () => of(false)});
        component.openCancelDialog();
        expect(snackbar.openFromComponent).not.toHaveBeenCalled();
    });


    it('should ship selected orders on click the `ship` button', () => {
        matDialog.open.and.returnValue({afterClosed: () => of(true)});
        checkChangeStatusRequestSent('ship');
    });

    it('should open shipping confirmation dialog on click on `ship` button', () => {
        component.selection.selected.length = 2;
        matDialog.open.and.returnValue({afterClosed: () => EMPTY});
        component.openShippingDialog();
        expect(matDialog.open).toHaveBeenCalledWith(ConfirmShippingDialogComponent, {data: {ordersNumber: 2, orderReference: undefined}});
    });

    it('should NOT open shipping confirmation dialog on click on `ship` button when no orders selected', () => {
        component.openShippingDialog();
        expect(matDialog.open).not.toHaveBeenCalledWith(ConfirmShippingDialogComponent, {data: {ordersNumber: 0}});
    });

    it('should open `select orders` dialog on click on `ship` button when no orders selected', () => {
        component.openShippingDialog();
        expect(matDialog.open.calls.mostRecent().args[0]).toEqual(SelectOrdersDialogComponent);
        expect(matDialog.open.calls.mostRecent().args[1].data).toEqual(OrderNotifyAction.ship);
    });

    it('should open snackbar if shipping is confirmed', () => {
        component.selection.selected.length = 2;
        matDialog.open.and.returnValue({afterClosed: () => of(true)});
        appStore.select.and.returnValue(of({id: 22}));
        ordersService.ship.and.returnValue(of({reference: 'some reference', channelName: 'some name'}))
        component.openShippingDialog();
        expect(snackbar.openFromComponent).toHaveBeenCalledTimes(1);
        expect(snackbar.openFromComponent.calls.mostRecent().args[0]).toEqual(OrderStatusChangedSnackbarComponent);
    });

    it('should NOT open snackbar if shipping is cancelled', () => {
        matDialog.open.and.returnValue({afterClosed: () => of(false)});
        component.openShippingDialog();
        expect(snackbar.openFromComponent).not.toHaveBeenCalled();
    });

    it('should show a SelectOrders dialog when click on print icon and no orders selected', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        ordersService.fetchOrdersList.and.returnValue(EMPTY);
        fixture.detectChanges();
        fixture.debugElement.nativeElement.querySelector('.print-button').click();
        fixture.detectChanges();
        expect(matDialog.open.calls.mostRecent().args[0]).toEqual(SelectOrdersDialogComponent);
        expect(matDialog.open.calls.mostRecent().args[1].data).toEqual('export');
    });


    function mockOrder() {
        return {
            _embedded: {
                order: [<Order>{
                    _embedded: {
                        channel: {
                            id: 11,
                            name: 'amazon',
                            _links: {
                                image: {
                                    href: 'image link'
                                },
                                self: {href: ''}
                            }
                        }
                    },
                    _links: {self: {href: ''}},
                    reference: 'ref',
                    id: 21,
                    status: OrderStatus.created,
                    payment: {
                        totalAmount: 22,
                        productAmount: 12,
                        shippingAmount: 10,
                        method: 'some method',
                        currency: 'EUR',
                    },
                    createdAt: '2018-01-08T13:25:27.773Z',
                    updatedAt: undefined,
                    shippingAddress: {
                        firstName: 'name1',
                        lastName: 'surname1'
                    },
                    billingAddress: {
                        firstName: 'name2',
                        lastName: 'surname2'
                    },
                    storeId: 21,
                    storeReference: 'some reference',
                    shipment: {trackingNumber: 'some tracking number', carrier: 'some carrier'},
                    acknowledgedAt: '2018-02-05'

                }]
            }
        }
    }

    function checkChangeStatusRequestSent(action) {
        appStore.select.and.returnValue(of({id: 190}));
        ordersService[action].and.returnValue(of({}));
        component.selection.select(<OrdersTableItem>{reference: 'tadada1', hasErrors: false}, <OrdersTableItem>{
            reference: 'tadada2',
            hasErrors: false
        });
        component.applyStatusAction(action);
        expect(ordersService[action]).toHaveBeenCalledTimes(1);
        expect(ordersService[action].calls.mostRecent().args[0]).toEqual(190);
        expect(ordersService[action].calls.mostRecent().args[1][0].reference).toEqual('tadada1');
        expect(ordersService[action].calls.mostRecent().args[1][1].reference).toEqual('tadada2');
        expect(ordersService[action].calls.mostRecent().args[1][0].hasErrors).not.toBeDefined();
        expect(ordersService[action].calls.mostRecent().args[1][1].hasErrors).not.toBeDefined();
    }

});

@Pipe({name: 'sfCurrency'})
class SfCurrencyPipe extends BlankPipe implements PipeTransform {
}
