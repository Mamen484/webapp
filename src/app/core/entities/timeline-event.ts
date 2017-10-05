import { TimelineEventOperation } from './timeline-event-operation.enum';
import { TimelineEventType } from './timeline-event-type.enum';

export interface TimelineEvent {
    name: TimelineEventType;
    action: TimelineEventOperation;
    data: {reference?: string, name?: string}
    occurredAt: string;
    _embedded?: {
       timeline: any[]
    }
}
