import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/entities/app-state';
import { TicketsService } from '../tickets.service';
import { Store as UserStore } from 'sfl-shared/entities/store';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { environment } from '../../../environments/environment';
import { MatTableDataSource } from '@angular/material';

@Component({
    selector: 'sf-tickets-list',
    templateUrl: './tickets-list.component.html',
    styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {

    currentStore: UserStore;
    token: string;
    dataSource: MatTableDataSource<any>;

    constructor(protected appStore: Store<AppState>,
                protected ticketsService: TicketsService,
                protected userInfo: SflUserService,
                protected windowRef: SflWindowRefService) {
    }

    ngOnInit() {
        this.appStore.select('currentStore').subscribe(store => this.currentStore = store);
        this.userInfo.fetchAggregatedInfo().subscribe(userInfo => this.token = userInfo.token);

        this.ticketsService.fetchTicketCollection().subscribe(response => {
            this.dataSource = new MatTableDataSource(response._embedded.ticket);
        });
    }

    goToToZapier() {
        this.windowRef.nativeWindow.open(environment.ZAPIER_LINK)
    }

}
