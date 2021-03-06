import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { BillingStore } from './billing-store';
import { PagedResponse } from 'sfl-shared/entities';
import { catchError } from 'rxjs/operators';
import { Invoice } from './invoicing-details/invoice';
import { InvoiceOrder } from './invoicing-details/invoice-order';

@Injectable({
    providedIn: 'root'
})
export class BillingStoreService {

    constructor(protected httpClient: HttpClient) {
    }

    fetchStoreCollection(queryParam: { limit?: number, page?: number, search?: string } = {}) {
        let params = new HttpParams();
        if (queryParam.limit) {
            params = params.set('limit', queryParam.limit.toString());
        }
        if (queryParam.page) {
            params = params.set('page', queryParam.page.toString());
        }
        if (typeof queryParam.search === 'string') {
            params = params.set('name', queryParam.search);
        }
        return this.httpClient.get(`${environment.SFA_BILLING_API}/store`, {params}) as Observable<PagedResponse<{ store: BillingStore[] }>>;
    }


    fetchStore(storeId) {
        return this.httpClient.get(`${environment.SFA_BILLING_API}/store/${storeId}`) as Observable<BillingStore>;
    }

    create(store): Observable<any> {
        return this.httpClient.post(`${environment.SFA_BILLING_API}/store`, {store})
            .pipe(catchError(error => throwError(error.error.detail)));
    }

    update(store): Observable<any> {
        let id = store.id;
        delete store.id;
        return this.httpClient.patch(`${environment.SFA_BILLING_API}/store/${id}`, {store});
    }

    fetchInvoicesCollection(storeId: number, queryParam: { limit?: number, page?: number, search?: string } = {}) {
        let params = new HttpParams().set('storeId', storeId.toString());
        if (queryParam.limit) {
            params = params.set('limit', queryParam.limit.toString());
        }
        if (queryParam.page) {
            params = params.set('page', queryParam.page.toString());
        }
        if (typeof queryParam.search === 'string') {
            params = params.set('name', queryParam.search);
        }

        return this.httpClient.get(`${environment.SFA_BILLING_API}/invoice`, {params}) as Observable<PagedResponse<{ invoice: Invoice[] }>>;
    }

    fetchInvoiceOrders(invoiceId: number) {
        return this.httpClient.get(`${environment.SFA_BILLING_API}/invoice/${invoiceId}/order`) as Observable<PagedResponse<{ order: InvoiceOrder[] }>>;
    }
}
