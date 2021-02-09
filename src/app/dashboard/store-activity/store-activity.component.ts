import { Component, OnInit } from '@angular/core';
import { StoreService } from 'sfl-shared/services';
import { Statistics } from 'sfl-shared/entities';
import { OrdersService } from '../../core/services/orders.service';
import { DashboardDataService } from '../dashboard-data.service';

@Component({
    selector: 'sf-store-activity',
    templateUrl: './store-activity.component.html',
    styleUrls: ['./store-activity.component.scss']
})
export class StoreActivityComponent implements OnInit {

    statistics: Statistics;
    ordersNumber: number;

    constructor(private dashboardDataService: DashboardDataService) {
    }

    ngOnInit(): void {
        this.dashboardDataService.getData().subscribe(({storeStatistics, ordersList}) => {
            this.statistics = storeStatistics;
            this.ordersNumber = ordersList.total;
        });
    }

}
