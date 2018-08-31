import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { TimelineService } from '../../core/services/timeline.service';
import { TimelineFilter } from '../../core/entities/timeline-filter';
import { TimelineEventName } from '../../core/entities/timeline-event-name.enum';
import { Observable, zip } from 'rxjs';
import { OrdersFilter } from '../../core/entities/orders/orders-filter';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';
import { TimelineEvent } from '../../core/entities/timeline-event';
import { Order } from '../../core/entities/orders/order';
import { TimelineEventAction } from '../../core/entities/timeline-event-action.enum';
import { PagedResponse } from '../../core/entities/paged-response';

const maxEvents = 5;

@Component({
    selector: 'sf-last-events',
    templateUrl: './last-events.component.html',
    styleUrls: ['./last-events.component.scss']
})
export class LastEventsComponent implements OnInit {

    actions = TimelineEventAction;

    lastImports: TimelineEvent[] = [];
    lastExports: TimelineEvent[] = [];
    acknowledgeErrors: Order[] = [];
    shipmentErrors: Order[] = [];

    totalAcknowledgeErrors: number;
    totalShipmentErrors: number;

    isDisplayed = false;

    constructor(protected ordersService: OrdersService,
                protected timelineService: TimelineService) {
    }

    ngOnInit() {
        this.fetchData();
    }

    protected fetchData() {
        zip(this.fetchImports(),
            this.fetchExports(),
            this.fetchAcknowledgmentErrors(),
            this.fetchShippingErrors()
        ).subscribe(([imports, exports, acknowledgeErrors, shipmentErrors]) => {
            this.lastImports = imports._embedded.timeline;
            this.lastExports = exports._embedded.timeline;
            this.acknowledgeErrors = acknowledgeErrors._embedded.order;
            this.shipmentErrors = shipmentErrors._embedded.order;

            this.totalAcknowledgeErrors = acknowledgeErrors.total;
            this.totalShipmentErrors = shipmentErrors.total;

            this.isDisplayed = Boolean(this.lastImports.length
                || this.lastExports.length
                || this.acknowledgeErrors.length
                || this.shipmentErrors.length);
        });

    }

    protected fetchImports(): Observable<PagedResponse<{ timeline: TimelineEvent[] }>> {
        const filter = new TimelineFilter();
        filter.action = [TimelineEventAction.finish, TimelineEventAction.error];
        filter.name = [TimelineEventName.import];

        return this.timelineService.getEvents(filter, maxEvents);
    }

    protected fetchExports(): Observable<PagedResponse<{ timeline: TimelineEvent[] }>> {
        const filter = new TimelineFilter();
        filter.action = [TimelineEventAction.finish, TimelineEventAction.error];
        filter.name = [TimelineEventName.export];

        return this.timelineService.getEvents(filter, maxEvents);
    }

    protected fetchAcknowledgmentErrors(): Observable<PagedResponse<{ order: Order[] }>> {
        const filter = new OrdersFilter();
        filter.limit = String(maxEvents);
        filter.error = OrderErrorType.acknowledge;
        filter.since = OrdersFilter.aWeekBefore();

        return this.ordersService.fetchOrdersList(filter);
    }

    protected fetchShippingErrors(): Observable<PagedResponse<{ order: Order[] }>> {
        const filter = new OrdersFilter();
        filter.limit = String(maxEvents);
        filter.error = OrderErrorType.ship;
        filter.since = OrdersFilter.aWeekBefore();

        return this.ordersService.fetchOrdersList(filter);
    }

}
