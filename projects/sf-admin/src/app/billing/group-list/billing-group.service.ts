import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { PagedResponse } from 'sfl-shared/entities';
import { BillingStore } from '../store-list/billing-store';
import { catchError } from 'rxjs/operators';
import { BillingGroup } from './billing-group';

@Injectable({
    providedIn: 'root'
})
export class BillingGroupService {

    constructor(protected httpClient: HttpClient) {
    }

    fetchGroupCollection(queryParam: { limit?: number, page?: number, search?: string } = {}) {
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
        return this.httpClient.get(`${environment.SFA_BILLING_API}/group`, {params}) as Observable<PagedResponse<{ group: BillingGroup[] }>>;
    }


    fetchStore(groupId) {
        return this.httpClient.get(`${environment.SFA_BILLING_API}/group/${groupId}`) as Observable<BillingStore>;
    }

    create(group): Observable<any> {
        return this.httpClient.post(`${environment.SFA_BILLING_API}/group`, {
            group: {
                name: group.name,
                stores: group.stores.map((store, index) => ({id: store.id, primary: index === 0})),
            }
        })
            .pipe(catchError(error => throwError(error.error.detail)));
    }

    update(group): Observable<any> {
        return this.httpClient.put(`${environment.SFA_BILLING_API}/group/${group.id}`, {
            group: {
                name: group.name,
                stores: group.stores.map((store, index) => ({id: store.id, primary: index === 0})),
            }
        })
            .pipe(catchError(error => throwError(error.error.detail)));
    }

}
