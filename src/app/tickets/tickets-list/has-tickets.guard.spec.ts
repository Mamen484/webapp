import { TestBed } from '@angular/core/testing';

import { HasTicketsGuard } from './has-tickets.guard';
import { TicketsService } from '../tickets.service';
import { of } from 'rxjs';

describe('HasTicketsGuard', () => {
    let ticketService: jasmine.SpyObj<TicketsService>;
    let guard: HasTicketsGuard;
    beforeEach(() => {
        ticketService = jasmine.createSpyObj('TicketsService spy', ['fetchTicketCollection']);
        TestBed.configureTestingModule({
            providers: [HasTicketsGuard,
                {provide: TicketsService, useValue: ticketService}],
        });

        guard = TestBed.get(HasTicketsGuard);
    });

    it('should return true if response.total > 0', async () => {
        ticketService.fetchTicketCollection.and.returnValue(of({total: 1}));
        const hasTickets = await guard.resolve().toPromise();
        expect(hasTickets).toBe(true);
    });

    it('should return false if response.total is 0', async () => {
        ticketService.fetchTicketCollection.and.returnValue(of({total: 0}));
        const hasTickets = await guard.resolve().toPromise();
        expect(hasTickets).toBe(false);
    });
});
