import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ConnectableObservable, Observable } from 'rxjs';
import { PagedResponse } from '../entities/paged-response';
import { Order } from '../entities/orders/order';
import { OrdersFilter } from '../entities/orders/orders-filter';
import { Address } from '../entities/orders/address';
import { OrdersExport } from '../entities/orders/orders-export';
import { publishReplay } from 'rxjs/operators';

@Injectable()
export class OrdersService {

    exports$: ConnectableObservable<PagedResponse<{ export: OrdersExport[] }>>

    constructor(protected httpClient: HttpClient) {
    }

    fetchOrdersList(storeId, filter: OrdersFilter = new OrdersFilter()) {
        return this.httpClient.get(`${environment.API_URL}/store/${storeId}/order`, {
            params: filter.toHttpParams()
        }) as Observable<PagedResponse<{ order: Order[] }>>;
    }

    fetchOrder(storeId, orderId): Observable<Order> {
        return this.httpClient.get(`${environment.API_URL}/store/${storeId}/order/${orderId}`) as Observable<Order>;
    }

    modifyOrder(storeId, orderId, order: { billingAddress: Address, shippingAddress: Address }) {
        return this.httpClient.put(`${environment.API_URL}/store/${storeId}/order/${orderId}`, {order});
    }

    modifyShippingAddress(storeId, orderId, shippingAddress: Address) {
        return this.httpClient.patch(`${environment.API_URL}/store/${storeId}/order/${orderId}`, {order: {shippingAddress}});
    }

    modifyBillingAddress(storeId, orderId, billingAddress: Address) {
        return this.httpClient.patch(`${environment.API_URL}/store/${storeId}/order/${orderId}`, {order: {billingAddress}});
    }

    updateItemsReferences(storeId, orderId, itemsReferencesAliases) {
        return this.httpClient.patch(`${environment.API_URL}/store/${storeId}/order/${orderId}`, {order: {itemsReferencesAliases}});
    }

    acknowledge(storeId, orders: { reference: string, channelName: string }[]) {
        return this.httpClient.post(`${environment.API_URL}/store/${storeId}/order/acknowledge`, {order: orders});
    }

    unacknowledge(storeId, orders: { reference: string, channelName: string }[]) {
        return this.httpClient.post(`${environment.API_URL}/store/${storeId}/order/unacknowledge`, {order: orders});
    }

    ship(storeId, orders: { reference: string, channelName: string, carrier?: string, trackingLink?: string, trackingNumber?: string }[]) {
        return this.httpClient.post(`${environment.API_URL}/store/${storeId}/order/ship`, {order: orders});
    }


    accept(storeId, orders: { reference: string, channelName: string }[]) {
        return this.httpClient.post(`${environment.API_URL}/store/${storeId}/order/accept`, {order: orders});
    }

    refuse(storeId, orders: { reference: string, channelName: string }[]) {
        return this.httpClient.post(`${environment.API_URL}/store/${storeId}/order/refuse`, {order: orders});
    }

    cancel(storeId, orders: { reference: string, channelName: string }[]) {
        return this.httpClient.post(`${environment.API_URL}/store/${storeId}/order/cancel`, {order: orders});
    }

    fetchExports(storeId) {
        if (!this.exports$) {
            this.exports$ = this.httpClient.get(`${environment.API_URL}/store/${storeId}/order/export`, {params: {limit: '200'}})
                .pipe(publishReplay()) as ConnectableObservable<PagedResponse<{ export: OrdersExport[] }>>;
            this.exports$.connect();
        }
        return this.exports$;
    }
}
