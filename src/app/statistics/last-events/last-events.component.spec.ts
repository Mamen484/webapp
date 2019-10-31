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
import { Order } from '../../core/entities/orders/order';

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

    it('should set `isDisplayed to false when no data got from server', () => {
        timelineService.getEvents.and.returnValues(
            of(<any>{_embedded: {timeline: []}}),
            of(<any>{_embedded: {timeline: []}}));
        ordersService.fetchOrdersList.and.returnValues(
            of(<any>{_embedded: {order: []}}),
            of(<any>{_embedded: {order: []}}));
        fixture.detectChanges();
        expect(component.isDisplayed).toBe(false);
    });

    it('should set `isDisplayed` to true when at least one import received from server', () => {
        timelineService.getEvents.and.returnValues(
            of(<any>{_embedded: {timeline: [{name: TimelineEventName.import}]}}),
            of(<any>{_embedded: {timeline: []}}));
        ordersService.fetchOrdersList.and.returnValues(
            of(<any>{_embedded: {order: []}}),
            of(<any>{_embedded: {order: []}}));
        fixture.detectChanges();
        expect(component.isDisplayed).toBe(true);
    });

    it('should set `isDisplayed` to true when at least one export received from server', () => {
        timelineService.getEvents.and.returnValue(
            of(<any>{_embedded: {timeline: [{name: TimelineEventName.import}]}})
        ),
        ordersService.fetchOrdersList.and.returnValues(
            of(<any>{_embedded: {order: []}}),
            of(<any>{_embedded: {order: []}}));
        fixture.detectChanges();
        expect(component.isDisplayed).toBe(true);
    });

    it('should set `isDisplayed` to true when at least one order with acknowledgment error received from server', () => {
        timelineService.getEvents.and.returnValues(
            of(<any>{_embedded: {timeline: []}}),
            of(<any>{_embedded: {timeline: []}}));
        ordersService.fetchOrdersList.and.returnValues(
            of(<any>{_embedded: {order: [{_embedded: {channel: {name: 'any name'}}}]}}),
            of(<any>{_embedded: {order: []}}));
        fixture.detectChanges();
        expect(component.isDisplayed).toBe(true);
    });

    it('should set `isDisplayed` to true when at least one order with shipping error received from server', () => {
        timelineService.getEvents.and.returnValues(
            of(<any>{_embedded: {timeline: []}}),
            of(<any>{_embedded: {timeline: []}}));
        ordersService.fetchOrdersList.and.returnValues(
            of(<any>{_embedded: {order: []}}),
            of(<any>{_embedded: {order: [{_embedded: {channel: {name: 'any name'}}}]}}));
        fixture.detectChanges();
        expect(component.isDisplayed).toBe(true);
    });

    it('should initialize proper data', () => {
        timelineService.getEvents.and.returnValues(of(<any>lastImportsResponse), of(<any>lastExportsResponse));
        ordersService.fetchOrdersList.and.returnValues(of(<any>acknowledgmentErrorsResponse), of(<any>shipmentErrorsResponse));
        fixture.detectChanges();
        validateImport(component.lastImports[0], TimelineEventAction.finish, '2018-04-27T17:27:44+00:00');
        validateImport(component.lastImports[1], TimelineEventAction.error, '2017-12-07T11:26:12+00:00');
        validateImport(component.lastImports[2], TimelineEventAction.finish, '2017-11-23T11:31:45+00:00');
        validateImport(component.lastImports[3], TimelineEventAction.error, '2017-11-22T12:06:47+00:00');
        validateImport(component.lastImports[4], TimelineEventAction.error, '2017-11-22T12:00:59+00:00');

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

    function validateError(order: Order, channelName: string, reference: string) {
        expect(order._embedded.channel.name).toBe(channelName);
        expect(order.reference).toBe(reference);
    }
});
