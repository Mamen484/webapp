import { TimelineEventAction } from './timeline-event-action.enum';
import { TimelineEventName } from './timeline-event-name.enum';
import { TimelineErrorReason } from './timeline-error-reason';
import { Channel } from './channel';

export interface TimelineEvent {
    name: TimelineEventName;
    action: TimelineEventAction;
    data?: {reference?: string, name?: string, reason?: TimelineErrorReason}
    occurredAt: string;
    id: string;
    storeId: number;
    _embedded: {channel: Channel}
}
