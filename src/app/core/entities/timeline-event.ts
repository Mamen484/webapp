import { TimelineEventAction } from './timeline-event-action.enum';
import { TimelineEventName } from './timeline-event-name.enum';
import { Channel } from 'sfl-shared/src/lib/core/entities';
import { TimelineErrorReason } from './timeline-error-reason';

export interface TimelineEvent {
    name: TimelineEventName;
    action: TimelineEventAction;
    data?: {reference?: string, name?: string, reason?: TimelineErrorReason}
    occurredAt: string;
    id: string;
    storeId: number;
    _embedded: {channel: Channel}
}
