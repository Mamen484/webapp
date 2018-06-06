import { OrdersTableComponent } from './orders-table.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { OrdersService } from '../../core/services/orders.service';
import { MatDialog, MatMenuModule, MatSnackBar, MatTableModule } from '@angular/material';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LabelsDialogComponent } from '../labels-dialog/labels-dialog.component';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { Order } from '../../core/entities/orders/order';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { OrdersFilter } from '../../core/entities/orders/orders-filter';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';
import { Router } from '@angular/router';
import { OrdersTableItem } from '../../core/entities/orders/orders-table-item';
import { ConfirmShippingDialogComponent } from '../confirm-shipping-dialog/confirm-shipping-dialog.component';
import { SfCurrencyPipe } from '../../shared/sf-currency.pipe';
import { OrderStatusChangedSnackbarComponent } from '../order-status-changed-snackbar/order-status-changed-snackbar.component';
import { SelectOrdersDialogComponent } from '../select-orders-dialog/select-orders-dialog.component';
import { OrderNotifyAction } from '../../core/entities/orders/order-notify-action.enum';

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

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj(['select']);
        ordersService = jasmine.createSpyObj(['fetchOrdersList', 'acknowledge', 'ship', 'refuse', 'cancel', 'accept', 'unacknowledge']);
        matDialog = jasmine.createSpyObj(['open']);
        cdr = jasmine.createSpyObj(['detectChanges', 'markForCheck']);
        filterService = jasmine.createSpyObj(['getFilter']);
        router = jasmine.createSpyObj(['navigate']);
        snackbar = jasmine.createSpyObj(['openFromComponent']);

        TestBed.configureTestingModule({
            declarations: [
                OrdersTableComponent,
                SfCurrencyPipe,
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
        expect(component.isLoadingResults).toEqual(false);
    });

    it('should format order data properly', () => {
        appStore.select.and.returnValue(of({}));
        filterService.getFilter.and.returnValue(of({}));
        ordersService.fetchOrdersList.and.returnValue(of(mockOrder()));
        fixture.detectChanges();
        let data = component.dataSource.data[0];
        expect(data.hasErrors).toEqual(false);
        expect(data.channelImage).toEqual('image link');
        expect(data.reference).toEqual('ref');
        expect(data.id).toEqual(21);
        expect(data.status).toEqual('created');
        expect(data.total).toEqual(22);
        expect(data.date).toEqual(1515417927773);
        expect(data.updatedAt).not.toBeDefined();
        expect(data.productAmount).toEqual(12);
        expect(data.shippingAmount).toEqual(10);
        expect(data.paymentMethod).toEqual('some method');
        expect(data.deliveryName).toEqual('name1 surname1');
        expect(data.invoicingName).toEqual('name2 surname2');
        expect(data.storeId).toEqual('some reference');
        expect(data.trackingNumber).toEqual('some tracking number');
        expect(data.imported).toEqual(true);
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

    it('should open LabelsDialogComponent on addLabel() call', () => {
        component.addLabel();
        expect(matDialog.open).toHaveBeenCalledWith(LabelsDialogComponent);
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
        expect(ordersService.fetchOrdersList.calls.mostRecent().args[1]).toEqual(filter);
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
        OrderNotifyAction.cancel,
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

    it('should ship selected orders on click the `ship` button', () => {
        matDialog.open.and.returnValue({afterClosed: () => of(true)});
        checkChangeStatusRequestSent('ship');
    });

    it('should open shipping confirmation dialog on click on `ship` button', () => {
        component.selection.selected.length = 2;
        matDialog.open.and.returnValue({afterClosed: () => EMPTY});
        component.openShippingDialog();
        expect(matDialog.open).toHaveBeenCalledWith(ConfirmShippingDialogComponent);
    });

    it('should NOT open shipping confirmation dialog on click on `ship` button when no orders selected', () => {
        component.openShippingDialog();
        expect(matDialog.open).not.toHaveBeenCalledWith(ConfirmShippingDialogComponent);
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




