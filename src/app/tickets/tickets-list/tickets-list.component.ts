import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { TicketsService } from '../tickets.service';
import { Store as UserStore } from 'sfl-shared/entities/store';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';
import { TableOperations } from 'sfl-shared/utils/table-operations';
import { Observable } from 'rxjs';
import { Ticket } from '../entities/ticket';
import { map } from 'rxjs/operators';
import { TicketState } from '../entities/ticket-state.enum';
import { TicketType } from '../entities/ticket-type.enum';

@Component({
    selector: 'sf-tickets-list',
    templateUrl: './tickets-list.component.html',
    styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent extends TableOperations<Ticket> implements OnInit {

    currentStore: UserStore;
    token: string;
    dataSource: Ticket[];
    displayedColumns = ['id', 'type', 'state'];

    ticketState = TicketState;
    ticketType = TicketType;

    isLoadingResults;

    constructor(protected appStore: Store<AppState>,
                protected ticketsService: TicketsService,
                protected userInfo: SflUserService,
                protected windowRef: SflWindowRefService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.appStore.select('currentStore').subscribe(store => this.currentStore = store);
        this.userInfo.fetchAggregatedInfo().subscribe(userInfo => this.token = userInfo.token);
    }

    goToToZapier() {
        this.windowRef.nativeWindow.open(environment.ZAPIER_LINK)
    }

    protected fetchCollection(params: { limit: number; page: number; search: string }): Observable<{ total: number; dataList: any[] }> {
        return this.ticketsService.fetchTicketCollection(params)
            .pipe(map(response => ({total: response.total, dataList: response._embedded.ticket})));
    }

}
