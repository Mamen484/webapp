import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../../core/entities/orders/order';

@Pipe({
    name: 'ordersExportLink'
})
export class OrdersExportLinkPipe implements PipeTransform {

    transform(orders: Order[], exportId: number): string {
        return '/Marketplaces/exportOrder?' + this.getExportParams(orders, exportId);
    }

    protected getExportParams(orders: Order[], exportId: number) {
        let params = orders.reduce((acc, order) => acc + `list_order[]=${order.id}&`, '');
        params += `id_export=${exportId}&order_unit=false`;
        return params;
    }

}
