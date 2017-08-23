import { TimelineEventOperation } from './timeline-event-operation.enum';
import { TimelineEventType } from './timeline-event-type.enum';
import { Rule } from './rule';
import { Order } from './order';

export interface TimelineEvent {
    type: TimelineEventType;
    operation: TimelineEventOperation;
    occurredAt: string;
    _embedded?: {
        rules?: Rule[],
        order?: Order[]
    }
}
