import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../core/entities/orders/order';

@Component({
    selector: 'sf-summary-block',
    templateUrl: './summary-block.component.html',
    styleUrls: ['./summary-block.component.scss']
})
export class SummaryBlockComponent implements OnInit {

    @Input() order: Order;

    constructor() {
    }

    ngOnInit() {
    }

}
