import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsListComponent } from './tickets-list.component';
import { Store } from '@ngrx/store';
import { TicketsService } from '../tickets.service';
import { AppState } from '../../core/entities/app-state';
import { SflUserService, SflWindowRefService } from 'sfl-shared/services';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { environment } from '../../../environments/environment';
import { FilterTicketsDialogComponent } from './filter-tickets-dialog/filter-tickets-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TicketState } from '../entities/ticket-state.enum';
import { TicketType } from '../entities/ticket-type.enum';
import { EMPTY, of, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AggregatedUserInfo } from 'sfl-shared/entities';
import { Title } from '@angular/platform-browser';

describe('TicketsListComponent', () => {
    let component: TicketsListComponent;
    let fixture: ComponentFixture<TicketsListComponent>;
    let appStore: jasmine.SpyObj<Store<AppState>>;
    let ticketsService: jasmine.SpyObj<TicketsService>;
    let userInfo: jasmine.SpyObj<SflUserService>;
    let windowRef: jasmine.SpyObj<SflWindowRefService>;
    let matDialog: jasmine.SpyObj<MatDialog>;
    let route;
    let titleService: jasmine.SpyObj<Title>;

    beforeEach(async(() => {
        appStore = jasmine.createSpyObj('Store spy', ['select']);
        ticketsService = jasmine.createSpyObj('TicketsService spy', ['fetchTicketCollection']);
        userInfo = jasmine.createSpyObj('SflUserService spy', ['fetchAggregatedInfo']);
        windowRef = {nativeWindow: jasmine.createSpyObj('Window spy', ['open'])};
        matDialog = jasmine.createSpyObj('MatDialog spy', ['select', 'open']);
        route = {data: new Subject()};
        titleService = jasmine.createSpyObj('Title', ['setTitle']);
        TestBed.configureTestingModule({
            declarations: [TicketsListComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Store, useValue: appStore},
                {provide: TicketsService, useValue: ticketsService},
                {provide: SflUserService, useValue: userInfo},
                {provide: SflWindowRefService, useValue: windowRef},
                {provide: MatDialog, useValue: matDialog},
                {provide: ActivatedRoute, useValue: route},
                {provide: Title, useValue: titleService},
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

    it('should set the page title', () => {
        expect(titleService.setTitle).toHaveBeenCalledWith('Shoppingfeed / API Integrations');
    });

    it('should open Zapier in a new window on goToZapier() call', () => {
        component.goToToZapier();
        expect(windowRef.nativeWindow.open).toHaveBeenCalledWith(environment.ZAPIER_LINK);
    });

    it('should open a filtering tickets dialog on openFilters() call', () => {
        matDialog.open.and.returnValue(<any>{afterClosed: () => EMPTY});
        component.selectedState = TicketState.succeed;
        component.selectedType = TicketType.refundOrder;
        component.openFilters();
        expect(matDialog.open).toHaveBeenCalledWith(FilterTicketsDialogComponent, {
            data: {state: TicketState.succeed, type: TicketType.refundOrder},
        });
    });

    it('should fetch tickets with a default type by default', () => {
        ticketsService.fetchTicketCollection.and.returnValue(EMPTY);
        userInfo.fetchAggregatedInfo.and.returnValue(EMPTY);
        appStore.select.and.returnValue(EMPTY);
        component.ngOnInit();
        route.data.next({hasTickets: true});

        expect(component.hasTickets).toBe(true);
        expect(ticketsService.fetchTicketCollection.calls.mostRecent().args[0].type).toBe(TicketType.default);
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

    it('should show a token if a user is NOT admin', () => {
        ticketsService.fetchTicketCollection.and.returnValue(EMPTY);
        userInfo.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['user'], token: 'tratata'})));
        appStore.select.and.returnValue(of({id: 22}));
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.textContent).toContain('tratata');
        expect(fixture.debugElement.nativeElement.textContent).not.toContain('Token is not available for admin users.');
    });

    it('should NOT show a token if a user is admin', () => {
        ticketsService.fetchTicketCollection.and.returnValue(EMPTY);
        userInfo.fetchAggregatedInfo.and.returnValue(of(AggregatedUserInfo.create({roles: ['admin'], token: 'tratata'})));
        appStore.select.and.returnValue(of({id: 22}));
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement.textContent).toContain('Token is not available for admin users.');
        expect(fixture.debugElement.nativeElement.textContent).not.toContain('tratata');
    });
});
