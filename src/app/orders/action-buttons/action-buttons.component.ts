import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { OrderAcknowledgement } from '../../core/entities/orders/order-acknowledgement.enum';
import { OrderNotifyAction } from '../../core/entities/order-notify-action.enum';

@Component({
    selector: 'sf-action-buttons',
    templateUrl: './action-buttons.component.html',
    styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {

    @Input() status: OrderStatus.waiting_store_acceptance | OrderStatus.waiting_shipment | OrderStatus.shipped;
    @Input() acknowledgment: OrderAcknowledgement;
    @Output() actionApplied = new EventEmitter<OrderNotifyAction>();

    actions = OrderNotifyAction;
    statuses = OrderStatus;
    acknowledgments = OrderAcknowledgement;

    constructor() {
    }

    ngOnInit() {
    }

}
