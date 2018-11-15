import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { BillingStore } from './billing-store';
import { PagedResponse } from 'sfl-shared/entities';

@Injectable({
    providedIn: 'root'
})
export class BillingService {

    constructor(protected httpClient: HttpClient) {
    }

    fetchStoreCollection() {
        return this.httpClient.get(`${environment.SFA_BILLING_API}/store`) as Observable<PagedResponse<{store: BillingStore[]}>>;
    }


    fetchStore(storeId) {
        return this.httpClient.get(`${environment.SFA_BILLING_API}/store/${storeId}`) as Observable<BillingStore>;
    }

    create(store): Observable<any> {
        return this.httpClient.post(`${environment.SFA_BILLING_API}/store`, {store});
    }

    update(store): Observable<any> {
        let id = store.id;
        delete store.id;
        return this.httpClient.patch(`${environment.SFA_BILLING_API}/store/${id}`, {store});
    }
}
