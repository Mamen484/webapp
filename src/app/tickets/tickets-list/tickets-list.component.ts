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
import { MatDialog } from '@angular/material';
import { FilterTicketsDialogComponent } from './filter-tickets-dialog/filter-tickets-dialog.component';

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

    selectedType: TicketType;
    selectedState: TicketState;

    isLoadingResults;

    constructor(protected appStore: Store<AppState>,
                protected ticketsService: TicketsService,
                protected userInfo: SflUserService,
                protected windowRef: SflWindowRefService,
                protected matDialog: MatDialog) {
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

    openFilters() {
        this.matDialog.open(FilterTicketsDialogComponent, {
            data: {type: this.selectedType, state: this.selectedState},
        }).afterClosed().subscribe(({type, state}) => {
            this.isLoadingResults = true;
            this.selectedType = type;
            this.selectedState = state;
            this.fetchData();
        });
    }

    protected fetchCollection(params): Observable<{ total: number; dataList: any[] }> {
        params.type = this.selectedType;
        params.state = this.selectedState;
        return this.ticketsService.fetchTicketCollection(params)
            .pipe(map(response => ({total: response.total, dataList: response._embedded.ticket})));
    }

}
