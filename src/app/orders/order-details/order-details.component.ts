import { Component, OnInit } from '@angular/core';
import { Order } from '../../core/entities/orders/order';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';

@Component({
    selector: 'sf-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

    order: Order;

    constructor(protected route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(({order}: { order: Order }) => {
            this.order = cloneDeep(order);
            // this.order.status = OrderStatus.shipped;
            // this.order._embedded.channel.name = 'Laredoute';
        });
    }

}
