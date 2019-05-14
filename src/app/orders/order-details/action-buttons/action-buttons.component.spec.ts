import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsComponent } from './action-buttons.component';
import { OrderStatus } from '../../../core/entities/orders/order-status.enum';
import { OrderAcknowledgment } from '../../../core/entities/orders/order-acknowledgment.enum';
import { CarrierDetailsDialogComponent } from '../../carrier-details-dialog/carrier-details-dialog.component';
import { EMPTY, of } from 'rxjs';
import { OrderStatusChangedSnackbarComponent } from '../../order-status-changed-snackbar/order-status-changed-snackbar.component';
import { OrderNotifyAction } from '../../../core/entities/orders/order-notify-action.enum';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/entities/app-state';
import { OrdersService } from '../../../core/services/orders.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RefundDialogComponent } from '../refund-dialog/refund-dialog.component';
import { Order } from '../../../core/entities/orders/order';
import { ConfirmCancellationDialogComponent } from '../../shared/confirm-cancellation-dialog/confirm-cancellation-dialog.component';
import { ChannelMap } from '../../../core/entities/channel-map.enum';

describe('ActionButtonsComponent', () => {
    let component: ActionButtonsComponent;
    let fixture: ComponentFixture<ActionButtonsComponent>;

    let matDialog: jasmine.SpyObj<MatDialog>;
    let snackbar: jasmine.SpyObj<MatSnackBar>;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let mockOrder: Order;

    beforeEach(async(() => {

        matDialog = jasmine.createSpyObj(['open']);
        snackbar = jasmine.createSpyObj(['openFromComponent', 'open']);
        ordersService = jasmine.createSpyObj(['ship', 'acknowledge', 'cancel', 'accept', 'refuse', 'unacknowledge', 'modifyOrder', 'updateItemsReferences']);
        appStore = jasmine.createSpyObj(['select']);
        TestBed.configureTestingModule({
            declarations: [ActionButtonsComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: MatDialog, useValue: matDialog},
                {provide: MatSnackBar, useValue: snackbar},
                {provide: OrdersService, useValue: ordersService},
                {provide: Store, useValue: appStore},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        mockOrder = <any>{items: [{status: OrderStatus.waiting_shipment}], _embedded: {channel: {name: 'amazon'}}};
        fixture = TestBed.createComponent(ActionButtonsComponent);
        component = fixture.componentInstance;
        component.order = mockOrder;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display correct buttons for `waiting_store_acceptance` status', () => {
        fixture.detectChanges();
        component.order.status = OrderStatus.waiting_store_acceptance;
        component.acknowledgment = undefined;
        fixture.detectChanges();
        expect(elements()[0].textContent.trim()).toEqual('Accept');
        expect(elements()[1].textContent.trim()).toEqual('Refuse');
        expect(elements().length).toEqual(2);
    });

    it('should display correct buttons for `waiting_shipment` status', () => {
        fixture.detectChanges();
        component.order.status = OrderStatus.waiting_shipment;
        component.acknowledgment = undefined;
        fixture.detectChanges();
        expect(elements()[0].textContent.trim()).toEqual('Ship');
        expect(elements()[1].textContent.trim()).toEqual('Cancel');
        expect(elements().length).toEqual(2);
    });

    it('should NOT display any buttons for `shipped` status', () => {
        fixture.detectChanges();
        component.order.status = OrderStatus.shipped;
        component.acknowledgment = undefined;
        fixture.detectChanges();
        expect(elements().length).toEqual(0);
    });

    it('should display correct buttons when the order is unacknowledged', () => {
        fixture.detectChanges();
        component.acknowledgment = OrderAcknowledgment.unacknowledged;
        fixture.detectChanges();
        expect(elements()[0].textContent.trim()).toEqual('Acknowledge');
        expect(elements().length).toEqual(1);
    });

    it('should display correct buttons when the order is acknowledged', () => {
        fixture.detectChanges();
        component.acknowledgment = OrderAcknowledgment.acknowledged;
        fixture.detectChanges();
        expect(elements()[0].textContent.trim()).toEqual('Unacknowledge');
        expect(elements().length).toEqual(1);
    });

    it('should display correct buttons for an acknowledged order with `waiting_shipment` status', () => {
        fixture.detectChanges();
        component.order.status = OrderStatus.waiting_shipment;
        component.acknowledgment = OrderAcknowledgment.acknowledged;
        fixture.detectChanges();
        expect(elements()[0].textContent.trim()).toEqual('Ship');
        expect(elements()[1].textContent.trim()).toEqual('Cancel');
        expect(elements()[2].textContent.trim()).toEqual('Unacknowledge');
        expect(elements().length).toEqual(3);
    });

    it('should display correct buttons for an unacknowledged order with `waiting_store_acceptance` status', () => {
        fixture.detectChanges();
        component.order.status = OrderStatus.waiting_store_acceptance;
        component.acknowledgment = OrderAcknowledgment.unacknowledged;
        fixture.detectChanges();
        expect(elements()[0].textContent.trim()).toEqual('Accept');
        expect(elements()[1].textContent.trim()).toEqual('Refuse');
        expect(elements()[2].textContent.trim()).toEqual('Acknowledge');
        expect(elements().length).toEqual(3);
    });

    it('should display a refund button if the channel is laredoute and status is shipped', () => {
        component.order.status = OrderStatus.shipped;
        component.order._embedded.channel.name = 'LaRedoute';
        component.order._embedded.channel.id = ChannelMap.laredoute;
        fixture.detectChanges();
        expect(component.supportsRefund).toEqual(true);
        expect(elements()[0].textContent.trim()).toEqual('Refund');
        expect(elements().length).toEqual(2);
    });

    it('should display a refund button if the channel is cdiscount and status is shipped', () => {
        component.order.status = OrderStatus.shipped;
        component.order._embedded.channel.name = 'CDiscount';
        component.order._embedded.channel.id = ChannelMap.cdiscount;
        fixture.detectChanges();
        expect(component.supportsRefund).toEqual(true);
        expect(elements()[0].textContent.trim()).toEqual('Refund');
        expect(elements().length).toEqual(2);
    });

    it('should NOT display a refund button if the channel is laredoute, status is partially_refunded, but all items have the refunded status',
        () => {
            component.order.status = OrderStatus.partially_refunded;
            component.order.items = <any>[{status: OrderStatus.refunded}, {status: OrderStatus.refunded}];
            component.order._embedded.channel.name = 'LaRedoute';
            component.order._embedded.channel.id = ChannelMap.laredoute;
            fixture.detectChanges();
            expect(component.supportsRefund).toEqual(false);
            expect(elements()[0].textContent.trim()).not.toEqual('Refund');
            expect(elements().length).toEqual(1);
        });

    it('should NOT display a refund button if the channel is cdiscount, status is partially_refunded, but all items have the refunded status',
        () => {
            component.order.status = OrderStatus.partially_refunded;
            component.order.items = <any>[{status: OrderStatus.refunded}, {status: OrderStatus.refunded}];
            component.order._embedded.channel.name = 'CDiscount';
            component.order._embedded.channel.id = ChannelMap.cdiscount;
            fixture.detectChanges();
            expect(component.supportsRefund).toEqual(false);
            expect(elements()[0].textContent.trim()).not.toEqual('Refund');
            expect(elements().length).toEqual(1);
        });

    it('should display a refund button if the channel is laredoute and status is partially_refunded', () => {
        component.order.status = OrderStatus.partially_refunded;
        component.order._embedded.channel.name = 'LaRedoute';
        component.order._embedded.channel.id = ChannelMap.laredoute;
        fixture.detectChanges();
        expect(component.supportsRefund).toEqual(true);
        expect(elements()[0].textContent.trim()).toEqual('Refund');
        expect(elements().length).toEqual(2);
    });

    it('should display a refund button if the channel is cdiscount and status is partially_refunded', () => {
        component.order.status = OrderStatus.partially_refunded;
        component.order._embedded.channel.name = 'CDiscount';
        component.order._embedded.channel.id = ChannelMap.cdiscount;
        fixture.detectChanges();
        expect(component.supportsRefund).toEqual(true);
        expect(elements()[0].textContent.trim()).toEqual('Refund');
        expect(elements().length).toEqual(2);
    });

    it('should set supportsRefund property to true if the channel is laredoute and status is partially_refunded', () => {
        component.order.status = OrderStatus.partially_refunded;
        component.order._embedded.channel.name = 'LaRedoute';
        component.order._embedded.channel.id = ChannelMap.laredoute;
        fixture.detectChanges();
        expect(component.supportsRefund).toEqual(true);
    });

    it('should set supportsRefund property to true if the channel is cdiscount and status is partially_refunded', () => {
        component.order.status = OrderStatus.partially_refunded;
        component.order._embedded.channel.name = 'CDiscount';
        component.order._embedded.channel.id = ChannelMap.cdiscount;
        fixture.detectChanges();
        expect(component.supportsRefund).toEqual(true);
    });

    it('should set supportsRefund property to true if the channel is laredoute and status is shipped', () => {
        component.order.status = OrderStatus.shipped;
        component.order._embedded.channel.name = 'LaRedoute';
        component.order._embedded.channel.id = ChannelMap.laredoute;
        fixture.detectChanges();
        expect(component.supportsRefund).toEqual(true);
    });

    it('should set supportsRefund property to true if the channel is cdiscount and status is shipped', () => {
        component.order.status = OrderStatus.shipped;
        component.order._embedded.channel.name = 'CDiscount';
        component.order._embedded.channel.id = ChannelMap.cdiscount;
        fixture.detectChanges();
        expect(component.supportsRefund).toEqual(true);
    });

    it('should set supportsRefund property to false if the channel is NOT laredoute and status is shipped', () => {
        component.order.status = OrderStatus.shipped;
        component.order._embedded.channel.name = 'any';
        fixture.detectChanges();
        expect(component.supportsRefund).toEqual(false);
    });

    it('should set supportsRefund property to false if the channel is laredoute and status is NOT shipped and is NOT partially_refunded', () => {
        component.order.status = OrderStatus.cancelled;
        component.order._embedded.channel.name = 'LaRedoute';
        component.order._embedded.channel.id = ChannelMap.laredoute;
        fixture.detectChanges();
        expect(component.supportsRefund).toEqual(false);
    });

    it('should open a refund dialog on openRefundDialog() call, passing an order into it', () => {
        component.openRefundDialog();
        expect(matDialog.open).toHaveBeenCalledWith(RefundDialogComponent, {data: mockOrder});
    });

    it('should initialize acknowledgment property on component init as acknowledged if order acknowledgedAt is defined', () => {
        component.order = <any>{
            createdAt: new Date('2012-12-12').getTime(),
            acknowledgedAt: new Date('2012-12-14').getTime(),
            items: [],
            payment: {},
            _embedded: {channel: {name: 'amazon'}},
        };
        fixture.detectChanges();
        expect(component.acknowledgment).toEqual(OrderAcknowledgment.acknowledged);
    });

    it('should initialize acknowledgment property on component init as UNacknowledged if order acknowledgedAt is NOT defined', () => {
        component.order = <any>{
            createdAt: new Date('2012-12-12').getTime(),
            items: [],
            payment: {},
            _embedded: {channel: {name: 'amazon'}},
        };
        fixture.detectChanges();
        expect(component.acknowledgment).toEqual(OrderAcknowledgment.unacknowledged);
    });

    it('should open a confirm cancellation dialog when click on `cancel` button', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => EMPTY});
        component.order.reference = '22';
        component.cancelOrder();
        expect(matDialog.open).toHaveBeenCalledWith(ConfirmCancellationDialogComponent, {data: {ordersNumber: 1, orderReference: '22'}});
    });

    it(`should send a cancel request when a user confirms cancelling an order`, () => {
        component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
        appStore.select.and.returnValue(of({id: 289}));
        ordersService.cancel.and.returnValue(EMPTY);
        matDialog.open.and.returnValue(<any>{
            afterClosed: () => of(true)
        });
        component.cancelOrder();
        expect(ordersService.cancel.calls.mostRecent().args[0]).toEqual(289);
        expect(ordersService.cancel.calls.mostRecent().args[1][0].reference).toEqual('ref');
        expect(ordersService.cancel.calls.mostRecent().args[1][0].channelName).toEqual('nom');
    });

    it(`should NOT send an cancel request when a user denies cancelling an order`, () => {
        component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
        appStore.select.and.returnValue(of({id: 289}));
        ordersService.cancel.and.returnValue(EMPTY);
        matDialog.open.and.returnValue(<any>{
            afterClosed: () => of(undefined)
        });
        component.cancelOrder();
        expect(ordersService.cancel).not.toHaveBeenCalled();
    });

    it('should open a carrier details dialog when click on `ship` button', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => EMPTY});
        component.shipOrder();
        expect(matDialog.open).toHaveBeenCalledWith(CarrierDetailsDialogComponent);
    });

    it('should send a ship request after carrier details confirmed', () => {
        component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
        appStore.select.and.returnValue(of({id: 289}));
        ordersService.ship.and.returnValue(EMPTY);
        matDialog.open.and.returnValue(<any>{
            afterClosed: () => of(<any>{
                carrier: 'ca',
                trackingNumber: 'cb',
                trackingLink: 'ce',
            })
        });
        component.applyStatusAction(OrderNotifyAction.ship);
        expect(ordersService.ship.calls.mostRecent().args[0]).toEqual(289);
        expect(ordersService.ship.calls.mostRecent().args[1][0].reference).toEqual('ref');
        expect(ordersService.ship.calls.mostRecent().args[1][0].channelName).toEqual('nom');
        expect(ordersService.ship.calls.mostRecent().args[1][0].carrier).toEqual('ca');
        expect(ordersService.ship.calls.mostRecent().args[1][0].trackingNumber).toEqual('cb');
        expect(ordersService.ship.calls.mostRecent().args[1][0].trackingLink).toEqual('ce');
    });

    it('should open a success snackbar if an order shipped successfully', () => {
        component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
        appStore.select.and.returnValue(of({id: 289}));
        ordersService.ship.and.returnValue(of({}));
        matDialog.open.and.returnValue(<any>{afterClosed: () => of({carrier: 'ca', trackingNumber: 'cb', trackingLink: 'ce'})});
        component.shipOrder();
        expect(snackbar.openFromComponent.calls.mostRecent().args[0]).toEqual(OrderStatusChangedSnackbarComponent);
        expect(snackbar.openFromComponent.calls.mostRecent().args[1].data.ordersNumber).toEqual(1);
        expect(snackbar.openFromComponent.calls.mostRecent().args[1].data.action).toEqual(OrderNotifyAction.ship);
    });

    it('should open a success snackbar if an order acknowledged successfully', () => {
        component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
        appStore.select.and.returnValue(of({id: 289}));
        ordersService.acknowledge.and.returnValue(of({}));
        component.applyStatusAction(OrderNotifyAction.acknowledge);
        expect(snackbar.openFromComponent.calls.mostRecent().args[0]).toEqual(OrderStatusChangedSnackbarComponent);
        expect(snackbar.openFromComponent.calls.mostRecent().args[1].data.ordersNumber).toEqual(1);
        expect(snackbar.openFromComponent.calls.mostRecent().args[1].data.action).toEqual(OrderNotifyAction.acknowledge);
    });

    [
        OrderNotifyAction.acknowledge,
        OrderNotifyAction.unacknowledge,
        OrderNotifyAction.accept,
        OrderNotifyAction.refuse,
    ].forEach(action => {
        it(`should send an ${action} request on call applyStatusAction with ${action} param`, () => {
            component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
            appStore.select.and.returnValue(of({id: 289}));
            ordersService[action].and.returnValue(EMPTY);
            component.applyStatusAction(action);
            expect(ordersService[action].calls.mostRecent().args[0]).toEqual(289);
            expect(ordersService[action].calls.mostRecent().args[1][0].reference).toEqual('ref');
            expect(ordersService[action].calls.mostRecent().args[1][0].channelName).toEqual('nom');
        });
    });

    describe('click on a status button (ship/cancel/unacknowledge)', () => {

        beforeEach(() => {
            component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
            appStore.select.and.returnValue(of({id: 289}));
            fixture.detectChanges();
            component.order.status = OrderStatus.waiting_shipment;
            component.acknowledgment = OrderAcknowledgment.acknowledged;
            fixture.detectChanges();
        });
        it('should send a ship request after carrier details confirmed', () => {
            ordersService.ship.and.returnValue(EMPTY);
            matDialog.open.and.returnValue(<any>{
                afterClosed: () => of({
                    carrier: 'ca',
                    trackingNumber: 'cb',
                    trackingLink: 'ce',
                })
            });

            const button = elements()[0];
            expect(button.textContent.trim()).toEqual('Ship');
            button.click();
            expect(ordersService.ship).toHaveBeenCalledWith(289, [{
                reference: 'ref',
                channelName: 'nom',
                carrier: 'ca',
                trackingNumber: 'cb',
                trackingLink: 'ce',
            }]);
        });

        it(`should send a cancel request when a user confirms cancelling an order `, () => {
            ordersService.cancel.and.returnValue(EMPTY);
            matDialog.open.and.returnValue(<any>{afterClosed: () => of(true)});
            const button = elements()[1];
            expect(button.textContent.trim()).toEqual('Cancel');
            button.click();
            expect(ordersService.cancel).toHaveBeenCalledWith(289, [{reference: 'ref', channelName: 'nom'}]);
        });

        it('should send an unacknowledge request when a user clicks on an unacknowledge button', () => {
            ordersService.unacknowledge.and.returnValue(EMPTY);
            const button = elements()[2];
            expect(button.textContent.trim()).toEqual('Unacknowledge');
            button.click();
            expect(ordersService.unacknowledge).toHaveBeenCalledWith(289, [{reference: 'ref', channelName: 'nom'}])
        })
    });

    describe('click on a status button (accept/refuse/acknowledge/cancel/unacknowledge)', () => {

        beforeEach(() => {
            component.order = <any>{reference: 'ref', _embedded: {channel: {name: 'nom'}}};
            appStore.select.and.returnValue(of({id: 289}));
            fixture.detectChanges();
            component.order.status = OrderStatus.waiting_store_acceptance;
            component.acknowledgment = OrderAcknowledgment.unacknowledged;
            fixture.detectChanges();
        });

        it('should send an accept request when a user clicks on an accept button', () => {
            ordersService.accept.and.returnValue(EMPTY);
            const button = elements()[0];
            expect(button.textContent.trim()).toEqual('Accept');
            button.click();
            expect(ordersService.accept).toHaveBeenCalledWith(289, [{reference: 'ref', channelName: 'nom'}])
        });

        it('should send an refuse request when a user clicks on an refuse button', () => {
            ordersService.refuse.and.returnValue(EMPTY);
            const button = elements()[1];
            expect(button.textContent.trim()).toEqual('Refuse');
            button.click();
            expect(ordersService.refuse).toHaveBeenCalledWith(289, [{reference: 'ref', channelName: 'nom'}])
        });

        it('should send an acknowledge request when a user clicks on an acknowledge button', () => {
            ordersService.acknowledge.and.returnValue(EMPTY);
            const button = elements()[2];
            expect(button.textContent.trim()).toEqual('Acknowledge');
            button.click();
            expect(ordersService.acknowledge).toHaveBeenCalledWith(289, [{reference: 'ref', channelName: 'nom'}])
        });

    });

    it('should send open a refund dialog when a user clicks on refund button', () => {
        component.order.status = OrderStatus.shipped;
        component.order._embedded.channel.name = 'LaRedoute';
        component.order._embedded.channel.id = ChannelMap.laredoute;
        fixture.detectChanges();
        const button = elements()[0];
        expect(button.textContent.trim()).toEqual('Refund');
        button.click();
        expect(matDialog.open).toHaveBeenCalledWith(RefundDialogComponent, {data: mockOrder});
    });


    function elements() {
        return fixture.debugElement.nativeElement.querySelectorAll('button') as HTMLButtonElement[];
    }
});
