import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusButtonsComponent } from './status-buttons.component';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';
import { OrdersView } from '../../core/entities/orders/orders-view.enum';
import { OrderAcknowledgment } from '../../core/entities/orders/order-acknowledgment.enum';
import { OrderNotifyAction } from '../../core/entities/orders/order-notify-action.enum';

describe('StatusButtonsComponent', () => {
    let component: StatusButtonsComponent;
    let fixture: ComponentFixture<StatusButtonsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatusButtonsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatusButtonsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display appropriate buttons for `to validate` tab', () => {
        setComponentInputs(
            OrderStatus.waiting_store_acceptance
        );
        expect(component.activeTab).toEqual(OrdersView.toValidate);
        expect(element().length).toEqual(2);
        expect(element()[0].textContent.trim()).toEqual('Refuse');
        expect(element()[1].textContent.trim()).toEqual('Accept');
    });

    it('should display appropriate buttons for `to import` tab', () => {
        setComponentInputs(
            OrderStatus.waiting_shipment,
            OrderAcknowledgment.unacknowledged
        );
        expect(component.activeTab).toEqual(OrdersView.toImport);
        expect(element().length).toEqual(1);
        expect(element()[0].textContent.trim()).toEqual('Acknowledge');
    });

    it('should display appropriate buttons for `import errors` tab', () => {
        setComponentInputs(
            undefined,
            undefined,
            OrderErrorType.acknowledge
        );
        expect(component.activeTab).toEqual(OrdersView.importErrors);
        expect(element().length).toEqual(1);
        expect(element()[0].textContent.trim()).toEqual('Acknowledge');
    });

    it('should display appropriate buttons for `to ship` tab', () => {
        setComponentInputs(
            OrderStatus.waiting_shipment
        );
        expect(component.activeTab).toEqual(OrdersView.toShip);
        expect(element().length).toEqual(2);
        expect(element()[0].textContent.trim()).toEqual('Cancel');
        expect(element()[1].textContent.trim()).toEqual('Ship');
    });

    it('should display appropriate buttons for `shipping errors` tab', () => {
        setComponentInputs(
            undefined,
            undefined,
            OrderErrorType.ship
        );
        expect(component.activeTab).toEqual(OrdersView.shippingErrors);
        expect(element().length).toEqual(2);
        expect(element()[0].textContent.trim()).toEqual('Cancel');
        expect(element()[1].textContent.trim()).toEqual('Ship');
    });

    it('should Not display any buttons for `shipped` tab', () => {
        setComponentInputs(
            OrderStatus.shipped
        );
        expect(component.activeTab).toEqual(OrdersView.shipped);
        expect(element().length).toEqual(0);
    });

    describe('click on a status button', () => {

        beforeEach(() => {
            spyOn(component.actionApplied, 'emit');
            fixture.detectChanges();
        });

        it('should emit a cancel event when click on a cancel button', () => {
            component.activeTab = OrdersView.toShip;
            fixture.detectChanges();
            const button = element()[0];
            expect(button.textContent.trim()).toBe('Cancel');
            button.click();
            expect(component.actionApplied.emit).toHaveBeenCalledWith(OrderNotifyAction.cancel);
        });

        it('should emit a Ship event when click on a Ship button', () => {
            component.activeTab = OrdersView.toShip;
            fixture.detectChanges();
            const button = element()[1];
            expect(button.textContent.trim()).toBe('Ship');
            button.click();
            expect(component.actionApplied.emit).toHaveBeenCalledWith(OrderNotifyAction.ship);
        });

        it('should emit a acknowledge event when click on a acknowledge button', () => {
            component.activeTab = OrdersView.toImport;
            fixture.detectChanges();
            const button = element()[0];
            expect(button.textContent.trim()).toBe('Acknowledge');
            button.click();
            expect(component.actionApplied.emit).toHaveBeenCalledWith(OrderNotifyAction.acknowledge);
        });

        it('should emit a refuse event when click on a refuse button', () => {
            component.activeTab = OrdersView.toValidate;
            fixture.detectChanges();
            const button = element()[0];
            expect(button.textContent.trim()).toBe('Refuse');
            button.click();
            expect(component.actionApplied.emit).toHaveBeenCalledWith(OrderNotifyAction.refuse);
        });

        it('should emit a accept event when click on a accept button', () => {
            component.activeTab = OrdersView.toValidate;
            fixture.detectChanges();
            const button = element()[1];
            expect(button.textContent.trim()).toBe('Accept');
            button.click();
            expect(component.actionApplied.emit).toHaveBeenCalledWith(OrderNotifyAction.accept);
        });
    });


    function element() {
        return fixture.debugElement.nativeElement.querySelectorAll('button') as HTMLButtonElement[];
    }

    function setComponentInputs(status: OrderStatus,
                                acknowledgment: OrderAcknowledgment = undefined,
                                errorType: OrderErrorType = undefined) {
        component.status = status;
        component.acknowledgment = acknowledgment;
        component.errorType = errorType;
        fixture.detectChanges();
    }
});
