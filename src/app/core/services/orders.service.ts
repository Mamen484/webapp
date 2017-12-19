import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { PagedResponse } from '../entities/paged-response';
import { Order } from '../entities/orders/order';
import { OrdersFilter } from '../entities/orders-filter';

@Injectable()
export class OrdersService {

    constructor(protected httpClient: HttpClient) {
    }

    fetchOrdersList(storeId, filter: OrdersFilter = new OrdersFilter()) {
        return <Observable<PagedResponse<{ order: Order[] }>>>
            this.httpClient.get(`${environment.API_URL}/store/${storeId}/order`, {
                params: filter.toHttpParams()
            });
    }

}
