import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersListComponent } from './orders-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { OrdersFilter } from '../../core/entities/orders-filter';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';

describe('OrdersListComponent', () => {
    let component: OrdersListComponent;
    let fixture: ComponentFixture<OrdersListComponent>;
    let service: OrdersFilterService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OrdersListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [OrdersFilterService]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrdersListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = TestBed.get(OrdersFilterService);
        let filter = new OrdersFilter();
        filter.tag = 'some tag';
        filter.search = 'some search';
        filter.status = OrderStatus.refused;
        filter.errorType = OrderErrorType.ship;
        service.setFilter(filter);
    });

    afterEach(() => {
        // ensure that none of modifications did not reset filter, the properties we did not modify remain not modified
        service.getFilter().take(1).subscribe(filter => {
            expect(filter.tag).toEqual('some tag');
            expect(filter.search).toEqual('some search');
        });
    });

    it('should set undefined status and errorType when the first tab (all orders) chosen', () => {
        component.changeTab({index: 0});
        service.getFilter().take(1).subscribe(filter => {
            expect(filter.status).not.toBeDefined();
            expect(filter.errorType).not.toBeDefined();
        });
    });

    it('should set waiting_store_acceptance status and undefined errorType when the second tab (to validate) chosen', () => {
        component.changeTab({index: 1});
        service.getFilter().take(1).subscribe(filter => {
            expect(filter.status).toEqual(OrderStatus.waiting_store_acceptance);
            expect(filter.errorType).not.toBeDefined();
        });
    });

    it('should set undefined status and `import` errorType when the fourth tab (import errors) chosen', () => {
        component.changeTab({index: 3});
        service.getFilter().take(1).subscribe(filter => {
            expect(filter.status).not.toBeDefined();
            expect(filter.errorType).toEqual(OrderErrorType.import);
        });
    });

    it('should set waiting_shipment status and undefined errorType when the fifth tab (to ship) chosen', () => {
        component.changeTab({index: 4});
        service.getFilter().take(1).subscribe(filter => {
            expect(filter.status).toEqual(OrderStatus.waiting_shipment);
            expect(filter.errorType).not.toBeDefined();
        });
    });

    it('should set undefined status and `ship` errorType when sixth tab (shipping errors) chosen', () => {
        component.changeTab({index: 5});
        service.getFilter().take(1).subscribe(filter => {
            expect(filter.status).not.toBeDefined();
            expect(filter.errorType).toEqual(OrderErrorType.ship);
        });
    });

    it('should set `shipped` status and undefined errorType when the seventh tab (shipped) chosen', () => {
        component.changeTab({index: 6});
        service.getFilter().take(1).subscribe(filter => {
            expect(filter.status).toEqual(OrderStatus.shipped);
            expect(filter.errorType).not.toBeDefined();
        });
    });
});
