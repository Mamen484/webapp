import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsComponent } from './action-buttons.component';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { OrderAcknowledgement } from '../../core/entities/orders/order-acknowledgement.enum';

describe('ActionButtonsComponent', () => {
    let component: ActionButtonsComponent;
    let fixture: ComponentFixture<ActionButtonsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActionButtonsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionButtonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display correct buttons for `waiting_store_acceptance` status', () => {
        component.status = OrderStatus.waiting_store_acceptance;
        fixture.detectChanges();
        expect(elements()[0].textContent.trim()).toEqual('Accept');
        expect(elements()[1].textContent.trim()).toEqual('Refuse');
        expect(elements().length).toEqual(2);
    });

    it('should display correct buttons for `waiting_shipment` status', () => {
        component.status = OrderStatus.waiting_shipment;
        fixture.detectChanges();
        expect(elements()[0].textContent.trim()).toEqual('Ship');
        expect(elements()[1].textContent.trim()).toEqual('Cancel');
        expect(elements().length).toEqual(2);
    });

    it('should display correct buttons for `shipped` status', () => {
        component.status = OrderStatus.shipped;
        fixture.detectChanges();
        expect(elements()[0].textContent.trim()).toEqual('Cancel');
        expect(elements().length).toEqual(1);
    });

    it('should display correct buttons when the order is unacknowledged', () => {
        component.acknowledgment = OrderAcknowledgement.unacknowledged;
        fixture.detectChanges();
        expect(elements()[0].textContent.trim()).toEqual('Acknowledge');
        expect(elements().length).toEqual(1);
    });

    it('should display correct buttons when the order is acknowledged', () => {
        component.acknowledgment = OrderAcknowledgement.acknowledged;
        fixture.detectChanges();
        expect(elements()[0].textContent.trim()).toEqual('Unacknowledge');
        expect(elements().length).toEqual(1);
    });

    it('should display correct buttons for an acknowledged order with `waiting_shipment` status', () => {
        component.status = OrderStatus.waiting_shipment;
        component.acknowledgment = OrderAcknowledgement.acknowledged;
        fixture.detectChanges();
        expect(elements()[0].textContent.trim()).toEqual('Ship');
        expect(elements()[1].textContent.trim()).toEqual('Cancel');
        expect(elements()[2].textContent.trim()).toEqual('Unacknowledge');
        expect(elements().length).toEqual(3);
    });

    it('should display correct buttons for an unacknowledged order with `waiting_store_acceptance` status', () => {
        component.status = OrderStatus.waiting_store_acceptance;
        component.acknowledgment = OrderAcknowledgement.unacknowledged;
        fixture.detectChanges();
        expect(elements()[0].textContent.trim()).toEqual('Accept');
        expect(elements()[1].textContent.trim()).toEqual('Refuse');
        expect(elements()[2].textContent.trim()).toEqual('Acknowledge');
        expect(elements().length).toEqual(3);
    });

    function elements() {
        return fixture.debugElement.nativeElement.querySelectorAll('button') as HTMLButtonElement[];
    }
});
