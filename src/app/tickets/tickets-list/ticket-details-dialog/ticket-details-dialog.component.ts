import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { TicketsService } from '../../tickets.service';
import { Ticket, TicketPayload } from '../../entities/ticket';
import { TicketType } from '../../entities/ticket-type.enum';

const basicColumns = ['id', 'marketplace', 'type'];
const shipmentColumns = ['id', 'marketplace', 'type', 'trackingNumber', 'carrier', 'trackingLink'];

@Component({
    selector: 'sf-ticket-details-dialog',
    templateUrl: './ticket-details-dialog.component.html',
    styleUrls: ['./ticket-details-dialog.component.scss']
})
export class TicketDetailsDialogComponent implements OnInit {

    displayedColumns = [];
    dataSource = new MatTableDataSource<TicketPayload>();
    ticket: Ticket;

    constructor(protected ticketsService: TicketsService, @Inject(MAT_DIALOG_DATA) protected ticketId) {
    }

    ngOnInit() {
        this.ticketsService.fetchTicket(this.ticketId).subscribe((ticket: Ticket) => {
            this.displayedColumns = ticket.type === TicketType.shipOrder
                ? shipmentColumns
                : basicColumns;
            this.dataSource.data = [ticket.payload];
            this.ticket = ticket;
        });
    }



}
