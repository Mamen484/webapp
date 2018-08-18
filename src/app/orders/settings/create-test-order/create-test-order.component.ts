import { Component, OnInit } from '@angular/core';
import { TestOrder } from '../../../core/entities/orders/test-order';

@Component({
    selector: 'sf-create-test-order',
    templateUrl: './create-test-order.component.html',
    styleUrls: ['./create-test-order.component.scss']
})
export class CreateTestOrderComponent implements OnInit {

    order = new TestOrder();

    constructor() {
    }

    ngOnInit() {
        this.addItem();
    }

    addItem() {
        this.order.items.push(<any>{});
    }

    removeItem(index) {
        this.order.items.splice(index, 1);
    }

}
