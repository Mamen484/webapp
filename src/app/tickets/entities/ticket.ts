import { TicketState } from './ticket-state.enum';
import { TicketType } from './ticket-type.enum';

export interface Ticket {
    id: string;
    type: TicketType;
    state: TicketState;
    scheduledAt: string;
    startedAt?: string;
    canceledAt?: string;
    finishedAt: string;
    payload: {[key: string]: any};
}
