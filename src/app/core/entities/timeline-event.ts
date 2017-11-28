import { TimelineEventAction } from './timeline-event-action.enum';
import { TimelineEventName } from './timeline-event-name.enum';

export interface TimelineEvent {
    name: TimelineEventName;
    action: TimelineEventAction;
    data: {reference?: string, name?: string}
    occurredAt: string;
    id: string;
    storeId: number;
}
