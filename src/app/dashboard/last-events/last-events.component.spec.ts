import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastEventsComponent } from './last-events.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { TimelineService } from 'sfl-shared/services';
import { lastImportsResponse } from './mocks/last-imports';
import { lastExportsResponse } from './mocks/last-exports';
import { acknowledgmentErrorsResponse } from './mocks/acknowledgment-errors';
import { shipmentErrorsResponse } from './mocks/shipment-errors';
import { TimelineEvent, TimelineEventAction, TimelineEventName } from 'sfl-shared/entities';
import { Order } from '../../core/entities/orders/order';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';
import { OrdersFilter } from '../../core/entities/orders/orders-filter';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { EMPTY, of } from 'rxjs';
import { DashboardDataService } from '../dashboard-data.service';
import { publishReplay } from 'rxjs/operators';

describe('LastEventsComponent', () => {
    let component: LastEventsComponent;
    let fixture: ComponentFixture<LastEventsComponent>;
    let dashboardDataService: jasmine.SpyObj<DashboardDataService>;

    beforeEach(async () => {
        dashboardDataService = jasmine.createSpyObj(['getData']);
        await TestBed.configureTestingModule({
            declarations: [LastEventsComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: DashboardDataService, useValue: dashboardDataService},
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LastEventsComponent);
        component = fixture.componentInstance;

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set `isDisplayed to false while there is no data loaded', () => {
        dashboardDataService.getData.and.returnValue(EMPTY.publishReplay());
        fixture.detectChanges();
        expect(component.isDisplayed).toBe(false);
    });

    it('should set `isDisplayed` to true when data loaded', () => {
        dashboardDataService.getData.and.returnValue(<any>of({
            imports: {_embedded: {timeline: []}},
            importErrors: {_embedded: {order: []}},
            shippingErrors: {_embedded: {order: []}},
        }));
        fixture.detectChanges();
        expect(component.isDisplayed).toBe(true);
    });
});
