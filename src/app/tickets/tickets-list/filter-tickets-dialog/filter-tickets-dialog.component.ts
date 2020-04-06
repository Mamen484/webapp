import { Component, Inject, OnInit } from '@angular/core';
import { TicketType } from '../../entities/ticket-type.enum';
import { TicketState } from '../../entities/ticket-state.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'sf-filter-tickets-dialog',
    templateUrl: './filter-tickets-dialog.component.html',
    styleUrls: ['./filter-tickets-dialog.component.scss']
})
export class FilterTicketsDialogComponent implements OnInit {

    types = TicketType;
    states = TicketState;

    type: TicketType;
    state: TicketState;

    constructor(@Inject(MAT_DIALOG_DATA) protected data: { type: TicketType, state: TicketState },
                protected matDialogRef: MatDialogRef<FilterTicketsDialogComponent, { type: TicketType, state: TicketState }>) {
        if (this.data.type) {
            this.type = this.data.type;
        }
        if (this.data.state) {
            this.state = this.data.state;
        }
    }

    ngOnInit() {
    }

    apply() {
        this.matDialogRef.close({type: this.type, state: this.state});
    }

}
