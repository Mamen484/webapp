import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { flatMap } from 'rxjs/operators';
import { Ticket } from './entities/ticket';
import { PagedResponse } from 'sfl-shared/entities';
import { Observable } from 'rxjs';
import { TicketType } from './entities/ticket-type.enum';
import { TicketState } from './entities/ticket-state.enum';

@Injectable({
    providedIn: 'root'
})
export class TicketsService {

    constructor(protected httpClient: HttpClient, protected appStore: Store<AppState>) {
    }

    fetchTicketCollection(queryParam: { limit?: number, page?: number, type?: TicketType, state?: TicketState } = {}) {
        let params = new HttpParams();
        if (queryParam.limit) {
            params = params.set('limit', queryParam.limit.toString());
        }
        if (queryParam.page) {
            params = params.set('page', queryParam.page.toString());
        }
        if (typeof queryParam.type === 'string') {
            params = params.set('type', queryParam.type);
        }
        if (typeof queryParam.state === 'string') {
            params = params.set('state', queryParam.state);
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
