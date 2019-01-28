import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PagedResponse } from 'sfl-shared/entities';
import { Ticket } from './entities/ticket';

@Injectable({
    providedIn: 'root'
})
export class TicketsService {

    constructor(protected httpClient: HttpClient, protected appStore: Store<AppState>) {
    }

    fetchTicketCollection(queryParam: { limit?: number, page?: number, search?: string } = {}) {
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
        return this.appStore.select('currentStore').pipe(
            flatMap(store => this.httpClient.get(environment.API_URL + `/store/${store.id}/ticket`, {params}))
        ) as Observable<PagedResponse<{ ticket: Ticket[] }>>;
    }

    fetchTicket(ticketId) {
        return this.appStore.select('currentStore').pipe(
            flatMap(store => this.httpClient.get(environment.API_URL + `/store/${store.id}/ticket/${ticketId}`))
        );
    }
}
