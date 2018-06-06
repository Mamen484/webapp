import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { OrderAcknowledgement } from '../../core/entities/orders/order-acknowledgement.enum';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';
import { OrderNotifyAction } from '../../core/entities/order-notify-action.enum';
import { ActiveTab } from '../../core/entities/active-tab.enum';
import { DetermineActiveTab } from '../../core/entities/determine-active-tab';

@Component({
    selector: 'sf-status-buttons',
    templateUrl: './status-buttons.component.html',
    styleUrls: ['./status-buttons.component.scss']
})
export class StatusButtonsComponent implements OnInit {

    @Input() status: OrderStatus;
    @Input() acknowledgment: OrderAcknowledgement;
    @Input() errorType: OrderErrorType;
    @Output() actionApplied = new EventEmitter<OrderNotifyAction>();

    activeTab: ActiveTab;
    tabs = ActiveTab;
    actions = OrderNotifyAction;

    constructor() {
    }

    ngOnInit() {
        this.activeTab = DetermineActiveTab.determine(this.status, this.acknowledgment, this.errorType);
    }

}
