import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrderStatus } from '../../core/entities/orders/order-status.enum';
import { OrderAcknowledgement } from '../../core/entities/orders/order-acknowledgement.enum';
import { OrderErrorType } from '../../core/entities/orders/order-error-type.enum';
import { OrderNotifyAction } from '../../core/entities/order-notify-action.enum';

enum ActiveTab {
    toShip,
    shippingErrors,
    toImport,
    toValidate,
    importErrors,
    shipped,
}

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
        if (this.status === OrderStatus.waiting_shipment && !this.acknowledgment) {
            this.activeTab = ActiveTab.toShip;
        } else if (this.errorType === OrderErrorType.ship) {
            this.activeTab = ActiveTab.shippingErrors;
        } else if (status === OrderStatus.waiting_shipment && this.acknowledgment === OrderAcknowledgement.unacknowledged) {
            this.activeTab = ActiveTab.toImport;
        } else if (status === OrderStatus.waiting_store_acceptance) {
            this.activeTab = ActiveTab.toValidate;
        } else if (this.errorType === OrderErrorType.acknowledge){
            this.activeTab = ActiveTab.importErrors;
        } else if (status === OrderStatus.shipped) {
            this.activeTab = ActiveTab.shipped;
        }
    }

}
