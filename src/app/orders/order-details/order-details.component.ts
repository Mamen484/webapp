import { Component, OnInit } from '@angular/core';
import { Order } from '../../core/entities/orders/order';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'sf-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

    order: Order;

    constructor(protected route: ActivatedRoute, protected titleService: Title) {
        this.titleService.setTitle('Shoppingfeed / Order / Details');
    }

    ngOnInit() {
        this.route.data.subscribe(({order}: { order: Order }) => {
            this.order = cloneDeep(order);
        });
    }

}
