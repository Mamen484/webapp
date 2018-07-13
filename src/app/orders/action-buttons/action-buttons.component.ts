import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { OrderNotifyAction } from '../../core/entities/orders/order-notify-action.enum';
import { OrderAcknowledgment } from '../../core/entities/orders/order-acknowledgment.enum';

@Component({
    selector: 'sf-action-buttons',
    templateUrl: './action-buttons.component.html',
    styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {

    @Input() status: OrderStatus.waiting_store_acceptance | OrderStatus.waiting_shipment | OrderStatus.shipped;
    @Input() acknowledgment: OrderAcknowledgment;
    @Output() actionApplied = new EventEmitter<OrderNotifyAction>();

    actions = OrderNotifyAction;
    statuses = OrderStatus;
    acknowledgments = OrderAcknowledgment;

    constructor() {
    }

    ngOnInit() {
    }

}
