import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { TicketsService } from '../tickets.service';
import { Store as UserStore } from 'sfl-shared/entities';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Ticket } from '../entities/ticket';
import { map } from 'rxjs/operators';
import { TicketState } from '../entities/ticket-state.enum';
import { TicketType } from '../entities/ticket-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { FilterTicketsDialogComponent } from './filter-tickets-dialog/filter-tickets-dialog.component';
import { TicketDetailsDialogComponent } from './ticket-details-dialog/ticket-details-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { TicketsDataService } from './tickets-data.service';
import {TableOperations} from 'sfl-tools/src/lib/table-operations';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'sf-tickets-list',
    templateUrl: './tickets-list.component.html',
    styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent extends TableOperations<Ticket> implements OnInit {

    currentStore: UserStore;
    token: string;
    displayedColumns = ['id', 'type', 'state'];
    hasTickets = false;
    isAdmin = false;

    ticketState = TicketState;
    ticketType = TicketType;

    selectedType: TicketType;
    selectedState: TicketState;

    isLoadingResults;

    apiDocsLink = environment.API_DOCUMENTATION;

    constructor(protected appStore: Store<AppState>,
                protected ticketsService: TicketsService,
                protected userInfo: SflUserService,
                protected windowRef: SflWindowRefService,
                protected matDialog: MatDialog,
                protected route: ActivatedRoute,
                protected ticketsDataService: TicketsDataService,
                protected titleService: Title) {
        super();
        this.titleService.setTitle('Shoppingfeed / API Integrations');
    }

    ngOnInit() {
        this.route.data.subscribe(({hasTickets}) => {
            if (hasTickets) {
                this.hasTickets = true;
                super.ngOnInit();

                this.ticketsDataService.watchUpdates().subscribe(() => {
                    this.isLoadingResults = true;
                    this.fetchData();
                });
            }
        });

        this.appStore.select('currentStore').subscribe(store => this.currentStore = store);
        this.userInfo.fetchAggregatedInfo().subscribe(userInfo => {
            this.isAdmin = userInfo.isAdmin();
            if (!this.isAdmin) {
                // show a token if only when a user is not admin,
                // fetchAggregatedInfoto prevent copy/pasting admin's token
                this.token = userInfo.token;
            }
        });
    }

    goToToZapier() {
        this.windowRef.nativeWindow.open(environment.ZAPIER_LINK)
    }

    openFilters() {
        this.matDialog.open(FilterTicketsDialogComponent, {
            data: {type: this.selectedType, state: this.selectedState},
        }).afterClosed().subscribe((data: { type: TicketType, state: TicketState }) => {
            if (!data) {
                return;
            }
            this.isLoadingResults = true;
            this.selectedType = data.type;
            this.selectedState = data.state;
            this.fetchData();
        });
    }

    showTicketDetails(ticketId) {
        this.matDialog.open(TicketDetailsDialogComponent, {data: ticketId});
    }

    protected fetchCollection(params): Observable<{ total: number; dataList: any[] }> {
        params.type = this.selectedType || TicketType.default;
        params.state = this.selectedState;
        return this.ticketsService.fetchTicketCollection(params)
            .pipe(map(response => ({total: response.total, dataList: response._embedded.ticket})));
    }

}
