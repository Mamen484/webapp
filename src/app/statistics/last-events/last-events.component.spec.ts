import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastEventsComponent } from './last-events.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { TimelineService } from '../../core/services/timeline.service';
import { of } from 'rxjs/index';
import { lastImportsResponse } from './mocks/last-imports';
import { lastExportsResponse } from './mocks/last-exports';
import { acknowledgmentErrorsResponse } from './mocks/acknowledgment-errors';
import { shipmentErrorsResponse } from './mocks/shipment-errors';
import { TimelineEvent } from '../../core/entities/timeline-event';
import { TimelineEventName } from '../../core/entities/timeline-event-name.enum';
import { TimelineEventAction } from '../../core/entities/timeline-event-action.enum';

describe('LastEventsComponent', () => {
    let component: LastEventsComponent;
    let fixture: ComponentFixture<LastEventsComponent>;
    let ordersService: jasmine.SpyObj<OrdersService>;
    let timelineService: jasmine.SpyObj<TimelineService>;

    beforeEach(async(() => {
        ordersService = jasmine.createSpyObj(['fetchOrdersList']);
        timelineService = jasmine.createSpyObj(['getEvents']);
        TestBed.configureTestingModule({
            declarations: [LastEventsComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: OrdersService, useValue: ordersService},
                {provide: TimelineService, useValue: timelineService},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LastEventsComponent);
        component = fixture.componentInstance;

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize proper data', () => {
        timelineService.getEvents.and.returnValues(of(lastImportsResponse), of(lastExportsResponse));
        ordersService.fetchOrdersList.and.returnValues(of(acknowledgmentErrorsResponse), of(shipmentErrorsResponse));
        fixture.detectChanges();
        validateImport(component.lastImports[0], TimelineEventAction.finish, '2018-04-27T17:27:44+00:00');
        validateImport(component.lastImports[1], TimelineEventAction.error, '2017-12-07T11:26:12+00:00');
        validateImport(component.lastImports[2], TimelineEventAction.finish, '2017-11-23T11:31:45+00:00');
        validateImport(component.lastImports[3], TimelineEventAction.error, '2017-11-22T12:06:47+00:00');
        validateImport(component.lastImports[4], TimelineEventAction.error, '2017-11-22T12:00:59+00:00');

        validateExport(component.lastExports[0], TimelineEventAction.error, '2018-04-27T17:27:44+00:00');
        validateExport(component.lastExports[1], TimelineEventAction.finish, '2017-12-07T11:26:12+00:00');
        validateExport(component.lastExports[2], TimelineEventAction.finish, '2017-11-23T11:31:45+00:00');
        validateExport(component.lastExports[3], TimelineEventAction.error, '2017-11-22T12:06:47+00:00');
        validateExport(component.lastExports[4], TimelineEventAction.error, '2017-11-22T12:00:59+00:00');

        validateError(component.acknowledgeErrors[0], 'Amazon', '11');
        validateError(component.acknowledgeErrors[1], 'Ebay', '12');

        validateError(component.shipmentErrors[0], 'Auchan', '635288706-A');
        validateError(component.shipmentErrors[1], 'Auchan', '634343247-A');
        validateError(component.shipmentErrors[2], 'Auchan', '627738029-A');

        expect(component.totalAcknowledgeErrors).toEqual(2);
        expect(component.totalShipmentErrors).toEqual(221);

    });

    function validateImport(importObject: TimelineEvent, action: TimelineEventAction, date: string) {
        expect(importObject.name).toBe(TimelineEventName.import);
        expect(importObject.action).toBe(action);
        expect(importObject.occurredAt).toBe(date);
    }

    function validateExport(exportObject: TimelineEvent, action: TimelineEventAction, date: string,) {
        expect(exportObject.name).toBe(TimelineEventName.export);
        expect(exportObject.action).toBe(action);
        expect(exportObject.occurredAt).toBe(date);
        expect(exportObject._embedded.channel.name).toBe('SmartFeed');
    }

    function validateError(order, channelName, reference) {

    }
});
