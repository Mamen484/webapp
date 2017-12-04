import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { PagedResponse } from '../entities/paged-response';
import { Order } from '../entities/orders/order';

@Injectable()
export class OrdersService {

    constructor(protected httpClient: HttpClient) {
    }

    fetchOrdersList(storeId) {
        return <Observable<PagedResponse<{ order: Order[] }>>>
            this.httpClient.get(`${environment.API_URL}/store/${storeId}/order`, {
                params: new HttpParams()
                    .set('limit', '25')
            });
    }

}
