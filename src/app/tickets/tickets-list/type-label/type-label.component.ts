import { Component, Input, OnInit } from '@angular/core';
import { TicketType } from '../../entities/ticket-type.enum';

@Component({
    selector: 'sf-ticket-type-label',
    templateUrl: './type-label.component.html',
    styleUrls: ['./type-label.component.scss']
})
export class TypeLabelComponent implements OnInit {

    @Input() ticketType: TicketType;
    ticketTypes = TicketType;

    constructor() {
    }

    ngOnInit() {
    }

}
