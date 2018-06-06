import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusButtonsComponent } from './status-buttons.component';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';
import { ActiveTab } from '../../core/entities/orders/active-tab.enum';
import { OrderAcknowledgment } from '../../core/entities/orders/order-acknowledgment.enum';

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
        expect(component.activeTab).toEqual(ActiveTab.toValidate);
        expect(element().length).toEqual(2);
        expect(element()[0].textContent.trim()).toEqual('Refuse');
        expect(element()[1].textContent.trim()).toEqual('Accept');
    });

    it('should display appropriate buttons for `to import` tab', () => {
        setComponentInputs(
            OrderStatus.waiting_shipment,
            OrderAcknowledgment.unacknowledged
        );
        expect(component.activeTab).toEqual(ActiveTab.toImport);
        expect(element().length).toEqual(1);
        expect(element()[0].textContent.trim()).toEqual('Acknowledge');
    });

    it('should display appropriate buttons for `import errors` tab', () => {
        setComponentInputs(
            undefined,
            undefined,
            OrderErrorType.acknowledge
        );
        expect(component.activeTab).toEqual(ActiveTab.importErrors);
        expect(element().length).toEqual(1);
        expect(element()[0].textContent.trim()).toEqual('Unacknowledge');
    });

    it('should display appropriate buttons for `to ship` tab', () => {
        setComponentInputs(
            OrderStatus.waiting_shipment
        );
        expect(component.activeTab).toEqual(ActiveTab.toShip);
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
        expect(component.activeTab).toEqual(ActiveTab.shippingErrors);
        expect(element().length).toEqual(2);
        expect(element()[0].textContent.trim()).toEqual('Cancel');
        expect(element()[1].textContent.trim()).toEqual('Ship');
    });

    it('should display appropriate buttons for `shipped` tab', () => {
        setComponentInputs(
            OrderStatus.shipped
        );
        expect(component.activeTab).toEqual(ActiveTab.shipped);
        expect(element().length).toEqual(1);
        expect(element()[0].textContent.trim()).toEqual('Cancel');
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
