import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailsDialogComponent } from './ticket-details-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TicketsService } from '../../tickets.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { EMPTY, of } from 'rxjs';
import { TicketType } from '../../entities/ticket-type.enum';

describe('TicketDetailsDialogComponent', () => {
    let component: TicketDetailsDialogComponent;
    let fixture: ComponentFixture<TicketDetailsDialogComponent>;
    let ticketsService: jasmine.SpyObj<TicketsService>;

    beforeEach(async(() => {
        ticketsService = jasmine.createSpyObj('TicketsService spy', ['fetchTicket']);
        TestBed.configureTestingModule({
            declarations: [TicketDetailsDialogComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: TicketsService, useValue: ticketsService},
                {provide: MAT_DIALOG_DATA,  useValue: 'some_ticket'},
            ],
            imports: [MatTableModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TicketDetailsDialogComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch ticket on init', () => {
        ticketsService.fetchTicket.and.returnValue(EMPTY);
        component.ngOnInit();
        expect(ticketsService.fetchTicket).toHaveBeenCalledWith('some_ticket');
    });

    it('should assign 6 columns to displayColumns when the ticket type is order.notify.shipment', () => {
        ticketsService.fetchTicket.and.returnValue(of({type: TicketType.shipOrder, payload: {}}));
        component.ngOnInit();
        expect(component.displayedColumns.length).toBe(6);
    });

    it('should assign 3 columns to displayColumns when the ticket type is NOT order.notify.shipment', () => {
        ticketsService.fetchTicket.and.returnValue(of({type: TicketType.acceptOrder, payload: {}}));
        component.ngOnInit();
        expect(component.displayedColumns.length).toBe(3);
    });
});
