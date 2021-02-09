import { Component, OnInit } from '@angular/core';
import { TimelineEvent, TimelineEventAction } from 'sfl-shared/entities';
import { Subject } from 'rxjs';
import { Order } from '../../core/entities/orders/order';
import { OrdersView } from '../../core/entities/orders/orders-view.enum';
import { DashboardDataService } from '../dashboard-data.service';

@Component({
    selector: 'sf-last-dashboard-events',
    templateUrl: './last-events.component.html',
    styleUrls: ['./last-events.component.scss']
})
export class LastEventsComponent implements OnInit {

    actions = TimelineEventAction;

    lastImport: TimelineEvent;
    acknowledgeErrors: Order[] = [];
    shipmentErrors: Order[] = [];

    totalAcknowledgeErrors: number;
    totalShipmentErrors: number;

    isDisplayed = false;
    isLoaded = new Subject();
    orderView = OrdersView;

    constructor(private dashboardDataService: DashboardDataService) {
    }

    ngOnInit() {
        this.fetchData();
    }

    protected fetchData() {
        this.dashboardDataService.getData().subscribe(({imports, importErrors, shippingErrors}) => {
            this.lastImport = imports._embedded.timeline.length > 0 && imports._embedded.timeline[0];
            this.acknowledgeErrors = importErrors._embedded.order;
            this.shipmentErrors = shippingErrors._embedded.order;

            this.totalAcknowledgeErrors = importErrors.total;
            this.totalShipmentErrors = shippingErrors.total;

            this.isDisplayed = true;
        })
    }

}
