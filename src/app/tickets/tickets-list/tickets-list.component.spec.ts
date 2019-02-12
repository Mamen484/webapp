import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsListComponent } from './tickets-list.component';
import { Store } from '@ngrx/store';
import { TicketsService } from '../tickets.service';
import { AppState } from '../../core/entities/app-state';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { MatDialog, MatTableModule } from '@angular/material';
import { environment } from '../../../environments/environment';
import { FilterTicketsDialogComponent } from './filter-tickets-dialog/filter-tickets-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TicketState } from '../entities/ticket-state.enum';
import { TicketType } from '../entities/ticket-type.enum';
import { EMPTY, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('TicketsListComponent', () => {
    let component: TicketsListComponent;
    let fixture: ComponentFixture<TicketsListComponent>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let ticketsService: jasmine.SpyObj<TicketsService>;
    let userInfo: jasmine.SpyObj<SflUserService>;
    let windowRef: jasmine.SpyObj<SflWindowRefService>;
    let matDialog: jasmine.SpyObj<MatDialog>;
    let route;

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj('Store spy', ['select']);
        ticketsService = jasmine.createSpyObj('TicketsService spy', ['fetchTicketCollection']);
        userInfo = jasmine.createSpyObj('SflUserService spy', ['fetchAggregatedInfo']);
        windowRef = {nativeWindow: jasmine.createSpyObj('Window spy', ['open'])};
        matDialog = jasmine.createSpyObj('MatDialog spy', ['select', 'open']);
        route = {data: new Subject()};
        TestBed.configureTestingModule({
            declarations: [TicketsListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Store, useValue: appStore},
                {provide: TicketsService, useValue: ticketsService},
                {provide: SflUserService, useValue: userInfo},
                {provide: SflWindowRefService, useValue: windowRef},
                {provide: MatDialog, useValue: matDialog},
                {provide: ActivatedRoute, useValue: route}
            ],
            imports: [MatTableModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TicketsListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open Zapier in a new window on goToZapier() call', () => {
        component.goToToZapier();
        expect(windowRef.nativeWindow.open).toHaveBeenCalledWith(environment.ZAPIER_LINK);
    });

    it('should open a filtering tickets dialog on openFilters() call', () => {
        matDialog.open.and.returnValue({afterClosed: () => EMPTY});
        component.selectedState = TicketState.succeed;
        component.selectedType = TicketType.refundOrder;
        component.openFilters();
        expect(matDialog.open).toHaveBeenCalledWith(FilterTicketsDialogComponent, {
            data: {state: TicketState.succeed, type: TicketType.refundOrder},
        });
    });

    it('should fetch tickets when hasTickets = true', () => {
        ticketsService.fetchTicketCollection.and.returnValue(EMPTY);
        userInfo.fetchAggregatedInfo.and.returnValue(EMPTY);
        appStore.select.and.returnValue(EMPTY);
        component.ngOnInit();
        route.data.next({hasTickets: true});

        expect(component.hasTickets).toBe(true);
        expect(ticketsService.fetchTicketCollection).toHaveBeenCalled();
    });

    it('should NOT fetch tickets when hasTickets = false', () => {
        ticketsService.fetchTicketCollection.and.returnValue(EMPTY);
        userInfo.fetchAggregatedInfo.and.returnValue(EMPTY);
        appStore.select.and.returnValue(EMPTY);
        component.ngOnInit();
        route.data.next({hasTickets: false});

        expect(component.hasTickets).toBe(false);
        expect(ticketsService.fetchTicketCollection).not.toHaveBeenCalled();
    });
});
