import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TicketsService } from '../tickets.service';
import { map, take } from 'rxjs/operators';
import { TicketType } from '../entities/ticket-type.enum';

@Injectable({
    providedIn: 'root'
})
export class HasTicketsGuard implements Resolve<boolean> {

    constructor(protected ticketsService: TicketsService) {
    }

    resolve(): Observable<boolean> {
        return this.ticketsService.fetchTicketCollection({limit: 1, type: TicketType.default})
            .pipe(take(1), map(response => response.total > 0));
    }
}
