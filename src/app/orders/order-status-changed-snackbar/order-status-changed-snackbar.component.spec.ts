import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusChangedSnackbarComponent } from './order-status-changed-snackbar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { OrderNotifyAction } from '../../core/entities/orders/order-notify-action.enum';

describe('OrderStatusChangedSnackbarComponent', () => {
    let component: OrderStatusChangedSnackbarComponent;
    let fixture: ComponentFixture<OrderStatusChangedSnackbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OrderStatusChangedSnackbarComponent],
            providers: [
                {provide: MAT_SNACK_BAR_DATA, useValue: {ordersNumber: 1, action: OrderNotifyAction.ship}},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderStatusChangedSnackbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display a message for 1 order', () => {
        expect(fixture.debugElement.nativeElement.textContent)
            .toEqual('Order shipment request has been sent');
    });

    it('should display a message for 2 orders', () => {
        component.ordersNumber = 2;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent)
            .toEqual('Order shipment requests have been sent');
    });

    it('should display a message for 21 order', () => {
        component.ordersNumber = 21;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent)
            .toEqual('Order shipment requests have been sent');
    });

    it('should display a message for an `acknowledge` action', () => {
        component.action = OrderNotifyAction.acknowledge;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent)
            .toEqual('Order acknowledgment request has been sent');
    });

    it('should display a message for an `accept` action', () => {
        component.action = OrderNotifyAction.accept;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent)
            .toEqual('Order acceptation request has been sent');
    });

    it('should display a message for an `refuse` action', () => {
        component.action = OrderNotifyAction.refuse;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent)
            .toEqual('Order refuse request has been sent');
    });

    it('should display a message for an `cancel` action', () => {
        component.action = OrderNotifyAction.cancel;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent)
            .toEqual('Order cancellation request has been sent');
    });

    it('should display a message for an `refund` action', () => {
        component.action = OrderNotifyAction.refund;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent)
            .toEqual('Order refund request has been sent');
    });

});
