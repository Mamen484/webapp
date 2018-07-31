import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';

import { FilteringTabsComponent } from './filtering-tabs.component';
import { OrdersFilterService } from '../../core/services/orders-filter.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrdersFilter } from '../../core/entities/orders/orders-filter';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { ActiveTab } from '../../core/entities/orders/active-tab.enum';

describe('FilteringTabsComponent', () => {
    let component: FilteringTabsComponent;
    let fixture: ComponentFixture<FilteringTabsComponent>;
    let filterService: jasmine.SpyObj<OrdersFilterService>;
    let service: OrdersFilterService;

    beforeEach(async(() => {
        filterService = jasmine.createSpyObj(['patchFilter']);
        TestBed.configureTestingModule({
            declarations: [FilteringTabsComponent],
            providers: [OrdersFilterService],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FilteringTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        service = TestBed.get(OrdersFilterService);
        let filter = new OrdersFilter();
        filter.tag = 'some tag';
        filter.search = 'some search';
        filter.status = OrderStatus.refused;
        filter.error = OrderErrorType.ship;
        service.setFilter(filter);
    });

    afterEach(() => {
        // ensure that none of modifications did not reset filter, the properties we did not modify remain not modified
        service.getFilter().pipe(take(1)).subscribe(filter => {
            expect(filter.tag).toEqual('some tag');
            expect(filter.search).toEqual('some search');
        });
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set undefined status and errorType when the first tab (all orders) chosen', () => {
        component.changeTab({index: ActiveTab.allOrders});
        service.getFilter().pipe(take(1)).subscribe(filter => {
            expect(filter.status).not.toBeDefined();
            expect(filter.error).not.toBeDefined();
        });
    });

    it('should set waiting_store_acceptance status and undefined errorType when the second tab (to validate) chosen', () => {
        component.changeTab({index: ActiveTab.toValidate});
        service.getFilter().pipe(take(1)).subscribe(filter => {
            expect(filter.status).toEqual(OrderStatus.waiting_store_acceptance);
            expect(filter.error).not.toBeDefined();
        });
    });

    it('should set undefined status and `import` errorType when the fourth tab (import errors) chosen', () => {
        component.changeTab({index: ActiveTab.importErrors});
        service.getFilter().pipe(take(1)).subscribe(filter => {
            expect(filter.status).not.toBeDefined();
            expect(filter.error).toEqual(OrderErrorType.acknowledge);
        });
    });

    it('should set waiting_shipment status and undefined errorType when the fifth tab (to ship) chosen', () => {
        component.changeTab({index: ActiveTab.toShip});
        service.getFilter().pipe(take(1)).subscribe(filter => {
            expect(filter.status).toEqual(OrderStatus.waiting_shipment);
            expect(filter.error).not.toBeDefined();
        });
    });

    it('should set undefined status and `ship` errorType when sixth tab (shipping errors) chosen', () => {
        component.changeTab({index: ActiveTab.shippingErrors});
        service.getFilter().pipe(take(1)).subscribe(filter => {
            expect(filter.status).not.toBeDefined();
            expect(filter.error).toEqual(OrderErrorType.ship);
        });
    });

    it('should set `shipped` status and undefined errorType when the seventh tab (shipped) chosen', () => {
        component.changeTab({index: ActiveTab.shipped});
        service.getFilter().pipe(take(1)).subscribe(filter => {
            expect(filter.status).toEqual(OrderStatus.shipped);
            expect(filter.error).not.toBeDefined();
        });
    });
});
