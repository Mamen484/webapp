import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PagedResponse } from '../entities/paged-response';
import { Order } from '../entities/orders/order';
import { OrdersFilter } from '../entities/orders-filter';

@Injectable()
export class OrdersService {

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

    acknowledge(storeId, orders: { reference: string, channelName: string }[]) {
        return this.httpClient.post(`${environment.API_URL}/store/${storeId}/order/acknowledge`, {order: orders});
    }

    ship(storeId, orders: { reference: string, channelName: string, carrier?: string, trackingLink?: string, trackingNumber?: string }[]) {
        return this.httpClient.post(`${environment.API_URL}/store/${storeId}/order/ship`, {order: orders});
    }

}
