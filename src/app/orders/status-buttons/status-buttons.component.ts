import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';
import { OrderNotifyAction } from '../../core/entities/orders/order-notify-action.enum';
import { OrdersView } from '../../core/entities/orders/orders-view.enum';
import { DetermineActiveTab } from '../../core/entities/determine-active-tab';
import { OrderAcknowledgment } from '../../core/entities/orders/order-acknowledgment.enum';

@Component({
    selector: 'sf-status-buttons',
    templateUrl: './status-buttons.component.html',
    styleUrls: ['./status-buttons.component.scss']
})
export class StatusButtonsComponent implements OnInit {

    @Input() status: OrderStatus;
    @Input() acknowledgment: OrderAcknowledgment;
    @Input() errorType: OrderErrorType;
    @Output() actionApplied = new EventEmitter<OrderNotifyAction>();

    activeTab: OrdersView;
    tabs = OrdersView;
    actions = OrderNotifyAction;

    constructor() {
    }

    ngOnInit() {
        this.activeTab = DetermineActiveTab.determine(this.status, this.acknowledgment, this.errorType);
    }

}
