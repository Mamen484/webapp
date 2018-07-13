import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../../core/entities/orders/order';

@Pipe({
    name: 'invoicesLink'
})
export class InvoicesLinkPipe implements PipeTransform {

    transform(orders: Order[]): any {
        return '/Marketplaces/exportOrderPdf?' + this.getExportPdfParams(orders)
    }

    protected getExportPdfParams(orders) {
        return orders.map((order) => `list_order[]=${order.id}`).join('&');
    }

}
