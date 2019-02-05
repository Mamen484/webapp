import { TicketState } from './ticket-state.enum';
import { TicketType } from './ticket-type.enum';

export interface TicketPayload {
    id: null,
    channelName: string,
    reference: string,
    carrier?: string,
    trackingLink?: string,
    trackingNumber?: string,
    channelId?: number;
}

export interface Ticket {
    id: string;
    type: TicketType;
    state: TicketState;
    scheduledAt: string;
    startedAt?: string;
    canceledAt?: string;
    finishedAt: string;
    payload: TicketPayload;
}
