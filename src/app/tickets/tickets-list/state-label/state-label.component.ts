import { Component, Input, OnInit } from '@angular/core';
import { TicketState } from '../../entities/ticket-state.enum';

@Component({
    selector: 'sf-ticket-state-label',
    templateUrl: './state-label.component.html',
    styleUrls: ['./state-label.component.scss']
})
export class StateLabelComponent implements OnInit {

    @Input() state: TicketState;
    ticketState = TicketState;

    constructor() {
    }

    ngOnInit() {
    }

}
