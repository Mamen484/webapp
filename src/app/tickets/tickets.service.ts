import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../core/entities/app-state';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PagedResponse } from 'sfl-shared/entities';

@Injectable({
    providedIn: 'root'
})
export class TicketsService {

    constructor(protected httpClient: HttpClient, protected appStore: Store<AppState>) {
    }

    fetchTicketCollection() {
        return this.appStore.select('currentStore').pipe(
            flatMap(store => this.httpClient.get(environment.API_URL + `/store/${store.id}/ticket`))
        ) as Observable<PagedResponse<{ticket: any[]}>>;
    }

    fetchTicket(ticketId) {
        return this.appStore.select('currentStore').pipe(
            flatMap(store => this.httpClient.get(environment.API_URL + `/store/${store.id}/ticket/${ticketId}`))
        );
    }
}
