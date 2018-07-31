import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../core/entities/orders/order';
import { ActivatedRoute } from '@angular/router';
import { OrderErrorType } from '../../../core/entities/orders/order-error-type.enum';

@Component({
    selector: 'sf-order-error-message',
    templateUrl: './order-error-message.component.html',
    styleUrls: ['./order-error-message.component.scss']
})
export class OrderErrorMessageComponent implements OnInit {

    @Input() order: Order;
    errorType: OrderErrorType;
    errorTypes = OrderErrorType;
    errorMessage: string;

    constructor(protected route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (this.errorTypeParamSpecified(params)) {
                this.setDefinedInParamsError(params.errorType);
            } else if (this.order.errors && this.order.errors.length) {
                this.errorType = this.order.errors[0].type;
                this.errorMessage = this.order.errors[0].message;
            }
        });
    }

    /**
     * Check if we need to choose a specific type error from an errors list.
     *
     * @param params
     * @returns {OrderErrorType.acknowledge | OrderErrorType.ship}
     */
    protected errorTypeParamSpecified(params) {
        return params && params.errorType && this.errorTypes[params.errorType];
    }

    /**
     * Search for a message of an error with a specific type
     */
    protected setDefinedInParamsError(errorType) {
        this.errorType = errorType;
        try {
            this.errorMessage = this.order.errors.find(error => error.type === this.errorType).message;
        } catch (err) {
        }
    }

}
