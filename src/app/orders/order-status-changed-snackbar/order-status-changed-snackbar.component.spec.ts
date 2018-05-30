import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusChangedSnackbarComponent } from './order-status-changed-snackbar.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { OrderNotifyAction } from '../../core/entities/order-notify-action.enum';

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
            .toEqual('Order has been shipped');
    });

    it('should display a message for 2 orders', () => {
        component.ordersNumber = 2;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent)
            .toEqual('Orders have been shipped');
    });

    it('should display a message for 21 order', () => {
        component.ordersNumber = 21;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent)
            .toEqual('Orders have been shipped');
    });

    it('should display a message for an `acknowledge` action', () => {
        component.action = OrderNotifyAction.acknowledge;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent)
            .toEqual('Order has been acknowledged');
    });

    it('should display a message for an `accept` action', () => {
        component.action = OrderNotifyAction.accept;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent)
            .toEqual('Order has been accepted');
    });

    it('should display a message for an `refuse` action', () => {
        component.action = OrderNotifyAction.refuse;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent)
            .toEqual('Order has been refused');
    });

    it('should display a message for an `cancel` action', () => {
        component.action = OrderNotifyAction.cancel;
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.textContent)
            .toEqual('Order has been canceled');
    });
});
